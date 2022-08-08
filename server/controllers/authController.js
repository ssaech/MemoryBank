const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const cookies = req.cookies;
    // ACCESS_TOKEN_SECRET=6056a856507652cba73527f63bb2a3a9f97b0cc981aefa086b0b68172fd95934faf2c8d3bc0c2d5ad227eb33cea2c5c926af52a72e427c9210971aea8bbca30a
    // REFRESH_TOKEN_SECRET=dd8270c051625c6f446f70f0023ed746eaf4a17e526c12230237f0e0fd516f5b22f7bba450b822567091a84e316e1de6ca4e039e7b79946592066d6e18266610
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            '6056a856507652cba73527f63bb2a3a9f97b0cc981aefa086b0b68172fd95934faf2c8d3bc0c2d5ad227eb33cea2c5c926af52a72e427c9210971aea8bbca30a',
            { expiresIn: '1h' }
        );
        const newRefreshToken = jwt.sign(
            { "username": foundUser.username },
            'dd8270c051625c6f446f70f0023ed746eaf4a17e526c12230237f0e0fd516f5b22f7bba450b822567091a84e316e1de6ca4e039e7b79946592066d6e18266610',
            { expiresIn: '1h' }
        );

        // Changed to let keyword
        let newRefreshTokenArray =
            !cookies?.jwt
                ? foundUser.refreshToken
                : foundUser.refreshToken.filter(rt => rt !== cookies.jwt);

        if (cookies?.jwt) {

            /* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
            const refreshToken = cookies.jwt;
            const foundToken = await User.findOne({ refreshToken }).exec();

            // Detected refresh token reuse!
            if (!foundToken) {
                // clear out ALL previous refresh tokens
                newRefreshTokenArray = [];
            }

            res.clearCookie('jwt', { httpOnly: false, sameSite: 'None', secure: true });
        }

        // Saving refreshToken with current user
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        const result = await foundUser.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', newRefreshToken, { httpOnly: false, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ accessToken });

    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };
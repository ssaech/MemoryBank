import {Link, useNavigate} from "react-router-dom";
import { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import axios from "axios"



const USER_REGEX = /^[A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{4,24}$/;

export default function LoginButton() {
    const pic = window.location.origin + "/brain.jpeg"
    const navigate = useNavigate();
    const st8 = useSelector(state => state)

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()

    const [sampwd, setSampwd] = useState('');
    const [samusr, setSamusr] = useState('');

    useEffect(() => {
        userRef.current.focus();
        setSamusr("GuestAccount");
        setSampwd("Password1!");
        
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmitreg = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = validMatch

        if (!v1 ) {
            setErrMsg("Username must be at least 3 characters");
            return;
        } else if (!v2 ){
            setErrMsg("Password must be at least 4 characters and contain an uppercase, lowercase, number and special character");
            return;
        } else if (!v3 ){
            setErrMsg("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post(`https://basedserverbysarn.herokuapp.com/register`,  {user: user, pwd: pwd});
            setSuccess(true);
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
            
        }
        alert('Account sucessfully created, returning to login page')
        navigate("/login");
    }
    


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const userData = await login({ user, pwd }).unwrap()
            dispatch(setCredentials({ ...userData, user }))
            setUser('')
            setPwd('')
            console.log(st8)
            navigate('/dashboard')
        } catch (err) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            // errRef.current.focus();
        }
    }

    const handleSubmitGuest = async (e) => {
        e.preventDefault()

        try {
            const userData = await login({ user: samusr, pwd: sampwd }).unwrap()
            dispatch(setCredentials({ ...userData, user: samusr }))
            setUser('')
            setPwd('')
            navigate('/dashboard')
        } catch (err) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }

        }
    }

    
   
    const content = isLoading ? <h1>Loading...</h1> : (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                    <Link to="/login">Sign in</Link>
                    </p>
                </section>
            ) : (
                <section className="w-3/4">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    {/* <h1>Register</h1> */}
                    <form onSubmit={handleSubmit}>
                    <div className="flex flex-col ">
                        <label htmlFor="username"> Username </label>
                        <input
                            className='p-2 bg-sky-100'
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        </div>

                        <div className="flex flex-col py-1">
                        <label htmlFor="password"> Password </label>
                        <input
                            className='p-2 bg-sky-100'
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        </div>

                        <div className="flex flex-col py-1">
                        <label htmlFor="confirm_pwd"> Confirm Password </label>
                        <input
                            className='p-2 bg-sky-100'
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        </div>

                    </form>

                </section>
            )}
        </>
        
    )

    return (
        <div className="flex justify-center w-full grid h-screen place-items-center ">
            <div className="flex flex-col w-3/4 max-w-xl">
                <div className="flex flex-col justify-center mb-10 place-items-center">
                <img src={pic} className="max-h-24 max-w-min " alt="brain"/>
                    <h1 className="flex justify-center text-2xl mb-6">Welcome to<span className="text-sky-600 whitespace-pre"> MemoryBank!</span></h1>
                    <p>
                    MemoryBank is here to give you peace of mind by helping you keep track of what is important. 
                    </p>
                </div>
                <div className="flex flex-col mb-36">
                    <div className="flex flex-col items-center">
                        
                        {content}

                    </div>
                    <div className="flex flex-col items-center">
                    
                        <button
                            onClick={(e) => handleSubmitreg(e)}
                            className="transition ease-in-out delay-150 bg-sky-400 hover:-translate-y-1 hover:scale-100 hover:bg-gradient-to-r from-sky-400 to-sky-600 duration-300
                            w-full my-3 py-2  inline-flex justify-center    rounded-2xl text-white flex-auto w-3/4 ">
                            Register
                        </button>
                        <button
                            onClick={(e) => handleSubmitGuest(e)}
                            className="animate-bounce transition ease-in-out delay-150 bg-sky-400 hover:-translate-y-1 hover:scale-100 hover:bg-gradient-to-r from-sky-400 to-pink-200 duration-300
                            w-full my-5 py-2  inline-flex justify-center rounded-2xl text-white flex-auto w-3/4 ">
                            Continue as Guest
                        </button>
                        <span className="hover:underline p-2">
                            <Link to="/login">Already have an account?</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
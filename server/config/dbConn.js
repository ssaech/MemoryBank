const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    console.log(process.env.DATABASE_URI);
   

    try {
        await mongoose.connect("hello-bud", {
            useUnifiedTopology: true,
            useNewUrlParser: true
            
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB

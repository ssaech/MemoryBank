const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    console.log(process.env.DATABASE_URI);
   

    try {
        await mongoose.connect("mongodb+srv://sarn:sarn@cluster0.ieryo.mongodb.net/?retryWrites=true&w=majority", {
            useUnifiedTopology: true,
            useNewUrlParser: true
            
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB
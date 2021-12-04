const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
    await mongoose.connect(URI,{ useUnifiedTopology: true, useNewUrlParser: true })
    console.log('db is connected')
}

module.exports = connectDB;
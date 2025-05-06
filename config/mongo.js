const mongoose = require('mongoose');
require('dotenv').config();


const mongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to mongodb")
    } catch (error) {
        console.log('mongodb connection failed', error)
    }
}

module.exports = mongo;
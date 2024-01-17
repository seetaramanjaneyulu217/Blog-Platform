const mongoose = require('mongoose')
require('dotenv').config

const connectToMongoDB = async () => {
    // Connecting the mongodb with my backend express app
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("MongoDB Connected SuccessFully")
        })
        .catch(() => {
            console.log("Error while connecting to MongoDB")
        })
}

module.exports = connectToMongoDB
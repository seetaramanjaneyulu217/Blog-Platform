// importing required packages
const express = require('express')
const mongoose = require('mongoose')

// initializing the dotenv configuration for using the secrets present in .env file
const dotenv = require('dotenv')
dotenv.config()

// initializing the express app
const app = express()


// Connecting the mongodb with my backend express app
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("MongoDB Connected SuccessFully")
    app.listen(4000, () => {
        console.log("Running on http://localhost:4000")
    })
})
.catch(() => {
    console.log("Error while connecting to MongoDB")
})


app.get('/', (req, res) => {
    res.send("<h1>I am your application server</h1>")
})
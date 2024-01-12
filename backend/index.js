// importing required packages
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

// initializing the dotenv configuration for using the secrets present in .env file
const dotenv = require('dotenv')
dotenv.config()

// initializing the express app
const app = express()

// importing the necessary routes
const userRouter = require('./routes/userRoutes.js')

// Using necessary middlewares
app.use(cors())
app.use(bodyParser.json())
app.use('/user', userRouter)


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


app.post('/login', (req, res) => {
    console.log(req.body)
})
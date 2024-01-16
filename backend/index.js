// importing required packages
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

// initializing the dotenv configuration for using the secrets present in .env file
const dotenv = require('dotenv')
dotenv.config()

// initializing the express app
const app = express()

// importing the necessary routes
const userRouter = require('./routes/userRoutes.js')
const blogRouter = require('./routes/blogRoutes.js')

// Using necessary middlewares
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/user', userRouter)
app.use('/blog', blogRouter)


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
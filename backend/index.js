// importing required packages
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

// initializing the express app
const app = express()

// initializing the dotenv configuration for using the secrets present in .env file
const dotenv = require('dotenv')
dotenv.config()

// importing the necessary routes
const userRouter = require('./routes/userRoutes.js')
const blogRouter = require('./routes/blogRoutes.js')

// Using necessary middlewares
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.set("trust proxy", 1)
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/user', userRouter)
app.use('/blog', blogRouter)


// Connecting the mongodb with my backend express app
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("MongoDB Connected SuccessFully")
        app.listen(4000, () => {
            app.get('/', (req, res) => {
                res.send("Hello, I am your server")
            })
        })
    })
    .catch(() => {
        console.log("Error while connecting to MongoDB")
    })

module.exports = app
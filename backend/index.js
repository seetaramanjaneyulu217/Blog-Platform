// importing required packages
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');


// importing the necessary routes and database
const userRouter = require('./routes/userRoutes.js')
const blogRouter = require('./routes/blogRoutes.js')
const connectToMongoDB = require('./database/connectToMongoDB.js')

// initializing the express app
const app = express()


// swagger options
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User API',
            version: '1.0.0',
        },
    },
    apis: ['/routes/userRoutes',
           '/routes/blogRoutes',
           '/controllers/userSignupControllers',
           '/controllers/blogControllers'
    ]
}

const specs = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

// Connecting to MongoDB
connectToMongoDB()

// initializing the dotenv configuration for using the secrets present in .env file
const dotenv = require('dotenv')
dotenv.config()


// Using necessary middlewares
app.use(cors({ origin: 'https://blog-platform-three-mauve.vercel.app', credentials: true }))
app.set("trust proxy", 1)
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/user', userRouter)
app.use('/blog', blogRouter)


app.get('/', (req, res) => {
    res.send("Hello, I ma your server")
})

app.listen(4000, (req, res) => {
    console.log('Server is running on http://localhost:4000')
})

module.exports = app
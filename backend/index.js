// importing required packages
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')


// importing the necessary routes and database
const userRouter = require('./routes/userRoutes.js')
const blogRouter = require('./routes/blogRoutes.js')
const connectToMongoDB = require('./database/connectToMongoDB.js')

// initializing the express app
const app = express()


// Swagger setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User API',
            version: '1.0.0',
            description: 'API documentation for user operations',
        },
        servers: [
            {
                url: 'https://blog-app-backend-9a12.onrender.com',
                description: 'Local development server',
            },
        ],
    },
    apis: [ __dirname + '/routes/userRoutes.js',
           __dirname + '/routes/blogRoutes.js',
           __dirname + '/controllers/userSignupController.js',
           __dirname + '/controllers/blogController.js'
    ],
}


const swaggerSpec = swaggerJsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


// Connecting to MongoDB
connectToMongoDB()

// initializing the dotenv configuration for using the secrets present in .env file
const dotenv = require('dotenv')
dotenv.config()


// Using necessary middlewares
app.use(cors({ origin: ['https://blog-platform-three-mauve.vercel.app', 'http://localhost:3000'], credentials: true }))
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
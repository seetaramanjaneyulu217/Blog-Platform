// importing required packages
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

// importing the models
const Users = require('../models/userSchema.js')

// importing the error function which handles the userDetails errors
const userDetailsErrors = require('../errors/userDetailsErrors.js')


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User operations
 */

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 minLength: 7
 *                 maxLength: 20
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 minLength: 8
 *                 pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         headers:
 *           Set-Cookie:
 *             description: Authorization token
 *             schema:
 *               type: string
 *             example: "jwtToken=<your_token_value>; Path=/; HttpOnly; Secure"
 *         content:
 *           application/json:
 *             example:
 *               msg: Registered Successfully
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               msg: Validation error message
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               msg: Error message
 */
const registerUser = async (req, res) => {

    try {

        const { username, email, password } = req.body

        if (password) {
            const encryptedPassword = await bcrypt.hash(password, 10)
            await new Users({ username, email, password: encryptedPassword }).save()
        }

        else {
            await new Users({ username, email, password }).save()
        }

        // after saving the user we get the _id of the registered user and
        // cretaes a JWT token for us to authorize the user.
        const user = await Users.findOne({ email })
        const token = jwt.sign({ user: { userid: user._id } }, process.env.JWT_SECRET)
        res.cookie("jwtToken", token, { httpOnly: false, secure: true, sameSite: 'none' })
        res.status(201).json({ msg: "Registered SuccessFully" })

    } catch (error) {
        const errors = userDetailsErrors(error)
        res.status(500).json({ msg: errors })
    }
}



/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 minLength: 8
 *                 pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         headers:
 *           Set-Cookie:
 *             description: Authorization token
 *             schema:
 *               type: string
 *             example: "jwtToken=<your_token_value>; Path=/; HttpOnly; Secure"
 *         content:
 *           application/json:
 *             example:
 *               msg: "Login Successful"
 *       401:
 *         description: Unauthorized - Invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               msg: "Invalid credentials"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               msg: "Error during login"
 */

// this api controller is run when the user logIn into the app.
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await Users.findOne({ email })
        // get the user. If user is present with the given details then
        // check the given password and hashed password matching or not
        if (user) {
            const presentUser = await bcrypt.compare(password, user.password)
            // if password also matches then allow the user to logIn.
            if (presentUser) {
                const token = jwt.sign({ user: { userid: user._id } }, process.env.JWT_SECRET)
                res.cookie("jwtToken", token, { httpOnly: false, secure: true, sameSite: 'none' })
                res.status(200).json({ msg: 'Login SuccessFul' })
            }

            else {
                res.status(500).json({ msg: "Invalid credentials" })
            }
        }
        else
            res.status(500).json({ msg: 'User is not present with these credentials' })
    } catch (error) {
        res.send(error)
    }
}



/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         headers:
 *           Set-Cookie:
 *             description: Clearing the Authorization token cookie
 *             schema:
 *               type: string
 *             example: "jwtToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure"
 *         content:
 *           application/json:
 *             example:
 *               msg: "Logout successful"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               msg: "Error while logging out"
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: jwtToken
 */
// this api controller runs when user wants to logout.
const logoutUser = async (req, res) => {
    try {
        res.clearCookie('jwtToken')
        res.status(200).json({ msg: 'Logout successful' })
    } catch (error) {
        res.status(500).json({ msg: 'Error while logging out' })
    }
}

module.exports = { registerUser, loginUser, logoutUser }
// importing required packages
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

// importing the models
const Users = require('../models/userSchema.js')

// importing the error function which handles the userDetails errors
 const userDetailsErrors = require('../errors/userDetailsErrors.js')


// this api controller is run when user registers for the first time.
const registerUser = async (req, res) => {

    try {
        
        const { username, email, password } = req.body

        if(password) {
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
        res.cookie("jwtToken", token, { httpOnly: true, secure: true })
        res.status(201).json({ msg: "Registered SuccessFully" })

    } catch (error) {
        const errors = userDetailsErrors(error)
        res.status(500).json({ msg: errors })
    }
}


// this api controller is run when the user logIn into the app.
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await Users.findOne({ email })
        // get the user. If user is present with the given details then
        // check the given password and hashed password matching or not
        if(user) {
            const presentUser = await bcrypt.compare(password, user.password)
            // if password also matches then allow the user to logIn.
            if(presentUser) {
                const token = jwt.sign({ user: { userid: user._id } }, process.env.JWT_SECRET)
                res.cookie("jwtToken", token, { httpOnly: true, secure: true })
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
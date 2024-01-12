// importing required packages
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

// importing the models
const users = require('../models/userSchema.js')

// importing the error function which handles the userDetails errors
 const userDetailsErrors = require('../errors/userDetailsErrors.js')

const registerUser = async (req, res) => {

    try {
        
        const { username, email, password } = req.body
        const encryptedPassword = await bcrypt.hash(password, 10)

        await new users({ username, email, password: encryptedPassword }).save()
        const user = await users.findOne({ email })
        const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET)
        res.json({ msg: "Registered SuccessFully", token: token })

    } catch (error) {
        const errors = userDetailsErrors(error)
        res.json({ msg: errors })
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await users.findOne({ email })
        if(user) {
            const presentUser = await bcrypt.compare(password, user.password)
            if(presentUser) {
                const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET)
                res.json({ msg: 'Login SuccessFul', token: token })
            }

            else {
                res.json({ msg: "Invalid credentials" })
            }
        }
        else
           res.json({ msg: 'User is not present with these credentials' })
    } catch (error) {
        res.send(error)
    }
}

module.exports = { registerUser, loginUser }
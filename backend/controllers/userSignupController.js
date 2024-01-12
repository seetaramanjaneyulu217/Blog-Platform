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
        const token = jwt.sign({
            user: {
                userid: user._id
            }
        }, process.env.JWT_SECRET)
        await users.updateOne({ _id: user._id } , { $set: { token : token  } })

        res.json({ msg: "Registered SuccessFully" })
    } catch (error) {
        const errors = userDetailsErrors(error)
        res.json({ msg: errors })
    }
}

module.exports = { registerUser }
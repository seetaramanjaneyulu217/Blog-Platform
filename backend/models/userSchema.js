const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        maxlength: [20, "Username should be of length < 20"],
        minlength: [7, "Username should be of length >= 7"]
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator: (value) => {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
            },

            message: "Entered invalid email"
        }
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: (value) => {
                return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(value);
            },
            message: "Password must contain at least one uppercase letter, one lowercase letter, one special character, one digit."
        }
    },

    likedBlogs: {
        type: Array,
        default: []
    }
})

const Users = mongoose.model('Users', userSchema)
module.exports = Users
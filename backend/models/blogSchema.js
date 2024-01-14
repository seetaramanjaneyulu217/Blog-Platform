const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title can not be empty"]
    },

    aboutBlog: {
        type: String,
        required: [true, "Blog field can not be empty"]
    },

    imageurl: {
        type: String,
        default: ""
    },

    likes: {
        type: Number,
        default: 0
    },

    comments: {
        type: Number,
        default: 0
    },

    ownerId: {
        type: mongoose.Schema.ObjectId
    }

}, { timestamps: true })

const blogs = mongoose.model('Blogs', blogSchema)
module.exports = blogs
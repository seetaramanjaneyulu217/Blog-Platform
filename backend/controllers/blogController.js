// importing required model
const mongoose = require("mongoose")

// This is the function used to handle the blogDetails errors
const blogDetailsErrors = require("../errors/blogDetailsErrors")
const blogs = require("../models/blogSchema.js")

const createBlog = async (req, res) => {
    try {

        const userId = req.user.userid
        const { title, aboutBlog, imageurl } = req.body
        await new blogs({ title, aboutBlog, imageurl, ownerId: new mongoose.Types.ObjectId(userId) }).save()
        res.json({ msg: 'Published SuccessFully' })

    } catch (error) {
        const errors = blogDetailsErrors(error)
        res.json({ msg: errors })
    }
}


const getAllBlogs = async (req, res) => {
    try {
        const userId = req.user.userid
        const allBlogs = await blogs.find({ ownerId: userId })
        res.json({ msg: allBlogs })
    } catch (error) {
        res.json({ msg: 'Error in getting your blogs' })
    }
}

module.exports = { createBlog, getAllBlogs }
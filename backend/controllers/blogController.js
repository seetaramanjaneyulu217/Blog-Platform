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

const editBlog = async (req, res) => {
    try {
        const userId = req.user.userid
        const { title, aboutBlog, imageurl, blogId } = req.body
        await blogs.updateOne({ _id: blogId }, { $set: { title, aboutBlog, imageurl }})
        res.json({ msg: 'Edit SuccessFul' })

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


const getSingleBlog = async (req, res) => {
    try {
        const blogId = req.body.blogId
        const blog = await blogs.findOne({ _id: blogId })
        res.status(200).json({ msg: blog })
    } catch (error) {
        res.status(500).json({ msg: 'Error in getting the blog' })
    }
}

module.exports = { createBlog, editBlog, getAllBlogs, getSingleBlog }
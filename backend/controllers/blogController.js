// importing required model
const mongoose = require("mongoose")

// This is the function used to handle the blogDetails errors
const blogDetailsErrors = require("../errors/blogDetailsErrors")
const blogs = require("../models/blogSchema.js")
const users = require('../models/userSchema.js')

const createBlog = async (req, res) => {
    try {

        const userId = req.user.userid
        const { title, aboutBlog, imageurl } = req.body
        const createStatus = await new blogs({ title, aboutBlog, imageurl, ownerId: new mongoose.Types.ObjectId(userId) }).save()

        if(createStatus)
            res.json({ msg: 'Published SuccessFully' })
        else
            res.json({ msg: 'Publishing the blog failed' })

    } catch (error) {
        const errors = blogDetailsErrors(error)
        res.json({ msg: errors })
    }
}

const editBlog = async (req, res) => {
    try {
        
        const { title, aboutBlog, imageurl, blogId } = req.body
        const editStatus = await blogs.updateOne({ _id: blogId }, { $set: { title, aboutBlog, imageurl }})
        if(editStatus)
            res.json({ msg: 'Edit SuccessFul' })
        else
            res.json({ msg: 'Edit failed' })

    } catch (error) {
        const errors = blogDetailsErrors(error)
        res.json({ msg: errors })
    }
}


const deleteBlog = async (req, res) => {
    try {
        
        const { blogId } = req.body
        const deleteStatus = await blogs.deleteOne({ _id: blogId })
        if(deleteStatus)
            res.json({ msg: 'Deletion SuccessFul' })
        else
            res.json({ msg: 'Deletion failed' })

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
        const user = await users.findOne({ _id: blog.ownerId })
        res.status(200).json({ msg: { blog, user } })
    } catch (error) {
        res.status(500).json({ msg: 'Error in getting the blog' })
    }
}

module.exports = { createBlog, editBlog, deleteBlog, getAllBlogs, getSingleBlog }
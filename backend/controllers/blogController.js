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

        if (createStatus)
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
        const editStatus = await blogs.updateOne({ _id: blogId }, { $set: { title, aboutBlog, imageurl } })
        if (editStatus)
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
        if (deleteStatus)
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
        const userId = req.user.userid
        const blogId = req.body.blogId
        const blog = await blogs.findOne({ _id: blogId })
        const loggedInUser = await users.findOne({ _id: userId })
        const user = await users.findOne({ _id: blog.ownerId })
        res.status(200).json({ msg: { blog, user, loggedInUser } })
    } catch (error) {
        res.status(500).json({ msg: 'Error in getting the blog' })
    }
}


const browseBlogs = async (req, res) => {
    try {
        const userId = req.user.userid
        const resultBlogs = await blogs.find({ ownerId: { $ne: userId } })
        res.status(200).json({ msg: resultBlogs })
    } catch (error) {
        res.status(500).json({ msg: 'Error in getting the blogs' })
    }
}


const likeBlog = async (req, res) => {
    try {
        const userId = req.user.userid
        const { blogId } = req.body
        const user = await users.findOne({ _id: userId })
        if (user.likedBlogs.includes(blogId))
            return res.json({ msg: 'You have already liked the blog' })
        const blog = await blogs.findOne({ _id: blogId })
        const blogUpdateResult = await blogs.updateOne({ _id: blogId }, {
            $set: { likes: blog.likes + 1 }
        })
        const userUpdateResult = await users.updateOne({ _id: userId }, { $set: { likedBlogs: [...user.likedBlogs, blogId] } })

        if (blogUpdateResult && userUpdateResult)
            res.json({ msg: 'Like Success' })
        else
            res.json({ msg: 'Error in liking the blog' })
    } catch (error) {
        res.status(500).json({ msg: 'Error liking the blog' })
    }
}


const commentOnBlog = async (req, res) => {
    try {
        const userId = req.user.userid
        const { username } = await users.findOne({ _id: userId })
        const { comment, blogId } = req.body
        const blog = await blogs.findOne({ _id: blogId })
        const commentResponse = await blogs.updateOne({ _id: blogId }, { $set: { comments: blog.comments + 1, allComments: [...blog.allComments, { username, comment }] } })
        if(commentResponse)
          res.json({ msg: 'Commented SuccessFully on the blog' })
        else
          res.json({ msg: 'Error commenting on the blog' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error commenting on the blog from error' })
    }
}
module.exports = { createBlog, editBlog, deleteBlog, getAllBlogs, getSingleBlog, browseBlogs, likeBlog, commentOnBlog }
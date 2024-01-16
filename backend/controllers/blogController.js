// importing required model
const mongoose = require("mongoose")

// This is the function used to handle the blogDetails errors
const blogDetailsErrors = require("../errors/blogDetailsErrors")

// imported the required models
const blogs = require("../models/blogSchema.js")
const users = require('../models/userSchema.js')


// this api controller is used to create the blog when user submits the details of the blog.
const createBlog = async (req, res) => {
    try {

        // userId comes from the auth/authorize.js file after authorizing the user.
        const userId = req.user.userid
        const { title, aboutBlog, imageurl } = req.body
        const createStatus = await new blogs({ title, aboutBlog, imageurl, ownerId: new mongoose.Types.ObjectId(userId) }).save()

        if (createStatus)
            res.status(200).json({ msg: 'Published SuccessFully' })
        else
            res.status(500).json({ msg: 'Publishing the blog failed' })

    } catch (error) {
        // if any of the error occurs like validation errors or creating erros then 
        // this function is run i.e. blogDetailsErrors()
        const errors = blogDetailsErrors(error)
        res.status(500).json({ msg: errors })
    }
}



// This api controller is run when the user edits the blog.
const editBlog = async (req, res) => {
    try {

        const { title, aboutBlog, imageurl, blogId } = req.body
        const editStatus = await blogs.updateOne({ _id: blogId }, { $set: { title, aboutBlog, imageurl } })
        if (editStatus)
            res.status(200).json({ msg: 'Edit SuccessFul' })
        else
            res.status(500).json({ msg: 'Edit failed' })

    } catch (error) {
        // if any of the error occurs like validation errors or creating erros then 
        // this function is run i.e. blogDetailsErrors()
        const errors = blogDetailsErrors(error)
        res.status(500).json({ msg: errors })
    }
}



// this api controller is run when the user deletes the blog.
const deleteBlog = async (req, res) => {
    try {
        // the blogId comes with the request from the frontend
        const { blogId } = req.body
        // deleting the blog if any blog is present with the blogId we got in the request.
        const deleteStatus = await blogs.deleteOne({ _id: blogId })
        if (deleteStatus)
            res.status(200).json({ msg: 'Deletion SuccessFul' })
        else
            res.status(500).json({ msg: 'Deletion failed' })

    } catch (error) {
        res.status(500).json({ msg: error })
    }
}


// this api controller is run when user requests to get his own blogs to see.
const getAllBlogs = async (req, res) => {
    try {
        const userId = req.user.userid
        const allBlogs = await blogs.find({ ownerId: userId })
        res.status(200).json({ msg: allBlogs })
    } catch (error) {
        res.status(500).json({ msg: 'Error in getting your blogs' })
    }
}


// this api controller is run when the user clicks on the single blog so that 
// to get the details of that single clicked blog.
const getSingleBlog = async (req, res) => {
    try {
        // used the userId to get the user who is loggedin.
        // used blogId to get the clicked blog by the user.
        // used ownerId present in the blog to get the user who published that blog.
        const userId = req.user.userid
        const blogId = req.body.blogId
        const blog = await blogs.findOne({ _id: blogId })
        const loggedInUser = await users.findOne({ _id: userId })
        const user = await users.findOne({ _id: blog.ownerId })

        res.status(200).json({ msg: { blog, user, loggedInUser } })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error in getting the blog' })
    }
}


// this api controller is used to get the blogs of the all other users for the loggedin user
// so that he can browse all other user's blogs.
const browseBlogs = async (req, res) => {
    try {
        const userId = req.user.userid
        // basically we get the userId of the loggedIn user and
        // we are checking the condition on the blogs that is 
        // get the blogs of the users other than the loggedin user.
        const resultBlogs = await blogs.find({ ownerId: { $ne: userId } })
        res.status(200).json({ msg: resultBlogs })
    } catch (error) {
        res.status(500).json({ msg: 'Error in getting the blogs' })
    }
}


// this api controller is run when the loggedIn user likes the blogs of the other users.
const likeBlog = async (req, res) => {
    try {
        const userId = req.user.userid
        const { blogId } = req.body
        const user = await users.findOne({ _id: userId })

        // if the user already liked that blog simply sending a message.
        if (user.likedBlogs.includes(blogId))
            return res.json({ msg: 'You have already liked the blog' })

        // else getting the blog and updating the required fields.
        const blog = await blogs.findOne({ _id: blogId })
        const blogUpdateResult = await blogs.updateOne({ _id: blogId }, {
            $set: { likes: blog.likes + 1 }
        })

        // also adding the blogId of the blog into the loggedIn users likedBlogs
        // so that we will have a track of the blogs that the user liked.
        const userUpdateResult = await users.updateOne({ _id: userId }, { $set: { likedBlogs: [...user.likedBlogs, blogId] } })

        if (blogUpdateResult && userUpdateResult)
            res.status(200).json({ msg: 'Like Success' })
        else
            res.status(500).json({ msg: 'Error in liking the blog' })
    } catch (error) {
        res.status(500).json({ msg: 'Error liking the blog' })
    }
}


// this api controller is run when the loggedIn user comments on the blog of the other user.
const commentOnBlog = async (req, res) => {
    try {
        const { comment, blogId } = req.body

        if(comment === '') 
          return res.json({ msg: 'Fill the comment field' })

        const userId = req.user.userid
        const { username } = await users.findOne({ _id: userId })
        const blog = await blogs.findOne({ _id: blogId })
        const commentResponse = await blogs.updateOne({ _id: blogId }, { $set: { comments: blog.comments + 1, allComments: [...blog.allComments, { username, comment }] } })

        if(commentResponse)
          res.status(200).json({ msg: 'Commented SuccessFully on the blog' })
        else
          res.status(500).json({ msg: 'Error commenting on the blog' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error commenting on the blog from error' })
    }
}


module.exports = { createBlog, editBlog, deleteBlog, getAllBlogs, getSingleBlog, browseBlogs, likeBlog, commentOnBlog }
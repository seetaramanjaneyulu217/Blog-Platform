// importing required model
const mongoose = require("mongoose")

// This is the function used to handle the blogDetails errors
const blogDetailsErrors = require("../errors/blogDetailsErrors")

// imported the required models
const Blogs = require("../models/blogSchema.js")
const Users = require('../models/userSchema.js')



/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Operations related to blogs
 */

/**
 * @swagger
 * /blog/create:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the blog.
 *               aboutBlog:
 *                 type: string
 *                 description: Details about the blog.
 *               imageurl:
 *                 type: string
 *                 description: URL of the blog's image (optional).
 *     responses:
 *       200:
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             example:
 *               msg: "Published Successfully"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               msg: "Publishing the blog failed"
 */
// this api controller is used to create the blog when user submits the details of the blog.
const createBlog = async (req, res) => {
    try {

        // userId comes from the auth/authorize.js file after authorizing the user.
        const userId = req.user.userid
        const { title, aboutBlog, imageurl } = req.body
        const createStatus = await new Blogs({ title, aboutBlog, imageurl, ownerId: new mongoose.Types.ObjectId(userId) }).save()

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




/**
 * @swagger
 * /blog/edit:
 *   put:
 *     summary: Edit an existing blog
 *     tags: [Blogs]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blogId:
 *                 type: string
 *                 description: The ID of the blog to edit.
 *               title:
 *                 type: string
 *                 description: The new title of the blog.
 *               aboutBlog:
 *                 type: string
 *                 description: New details about the blog.
 *               imageurl:
 *                 type: string
 *                 description: New URL of the blog's image (optional).
 *     responses:
 *       200:
 *         description: Blog edited successfully
 *         content:
 *           application/json:
 *             example:
 *               msg: "Edit Successful"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               msg: "Edit failed"
 */

// This api controller is run when the user edits the blog.
const editBlog = async (req, res) => {
    try {
        const { title, aboutBlog, imageurl, blogId } = req.body
        const editStatus = await Blogs.updateOne({ _id: blogId }, { $set: { title, aboutBlog, imageurl } })
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



/**
 * @swagger
 * /blog/delete:
 *   delete:
 *     summary: Delete an existing blog
 *     tags: [Blogs]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blogId:
 *                 type: string
 *                 description: The ID of the blog to delete.
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               msg: "Deletion Successful"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               msg: "Deletion failed"
 */

// this api controller is run when the user deletes the blog.
const deleteBlog = async (req, res) => {
    try {
        // the blogId comes with the request from the frontend
        const { blogId } = req.body
        // deleting the blog if any blog is present with the blogId we got in the request.
        const deleteStatus = await Blogs.deleteOne({ _id: blogId })
        if (deleteStatus)
            res.status(200).json({ msg: 'Deletion SuccessFul' })
        else
            res.status(500).json({ msg: 'Deletion failed' })

    } catch (error) {
        res.status(500).json({ msg: error })
    }
}



/**
 * @swagger
 * /blog/getallblogs:
 *   get:
 *     summary: Get all blogs for the authenticated user
 *     tags: [Blogs]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of blogs retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               msg: [{ "title": "Blog 1", "aboutBlog": "Details about Blog 1", "imageurl": "https://example.com/image1.jpg", "likes": 10, "comments": 5, "allComments": [], "createdAt": "2022-01-20T12:30:45.678Z", "updatedAt": "2022-01-21T08:45:12.345Z" }, ...]
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               msg: "Error in getting your Blogs"
 */

// this api controller is run when user requests to get his own Blogs to see.
const getAllBlogs = async (req, res) => {
    try {
        const userId = req.user.userid
        const allBlogs = await Blogs.find({ ownerId: userId })
        res.status(200).json({ msg: allBlogs })
    } catch (error) {
        res.status(500).json({ msg: 'Error in getting your Blogs' })
    }
}




/**
 * @swagger
 * /blog/getblogbyid:
 *   post:
 *     summary: Get details of a single blog
 *     tags: [Blogs]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blogId:
 *                 type: string
 *                 description: The ID of the blog to retrieve details.
 *     responses:
 *       200:
 *         description: Blog details retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               msg: {
 *                 blog: {
 *                   "title": "Sample Blog",
 *                   "aboutBlog": "Details about the sample blog",
 *                   "imageurl": "",
 *                   "likes": 0,
 *                   "comments": 0,
 *                   "allComments": [{ "user": "User1", "comment": "Great blog!" }],
 *                   "createdAt": "",
 *                   "updatedAt": ""
 *                 },
 *                 user: {
 *                   "username": "Owner",
 *                   "email": "Owner@example.com",
 *                   "likedBlogs": ["blogId1", "blogId2"],
 *                   "createdAt": "",
 *                   "updatedAt": ""
 *                 },
 *                 loggedInUser: {
 *                   "username": "LoggedInUser",
 *                   "email": "loggedin@example.com",
 *                   "likedBlogs": ["blogId1", "blogId2"],
 *                   "createdAt": "",
 *                   "updatedAt": ""
 *                 }
 *               }
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               msg: "Error in getting the blog"
 */

// this api controller is run when the user clicks on the single blog so that 
// to get the details of that single clicked blog.
const getSingleBlog = async (req, res) => {
    try {
        // used the userId to get the user who is loggedin.
        // used blogId to get the clicked blog by the user.
        // used ownerId present in the blog to get the user who published that blog.
        const userId = req.user.userid
        const blogId = req.body.blogId
        const blog = await Blogs.findOne({ _id: blogId })
        const loggedInUser = await Users.findOne({ _id: userId })
        const user = await Users.findOne({ _id: blog.ownerId })

        res.status(200).json({ msg: { blog, user, loggedInUser } })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error in getting the blog' })
    }
}







/**
 * @swagger
 * /blog/browseblogs:
 *   get:
 *     summary: Browse blogs of other users
 *     tags: [Blogs]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of blogs from other users retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               msg: [
 *                 {
 *                   "title": "User1's Blog",
 *                   "aboutBlog": "Details about User1's blog",
 *                   "imageurl": "",
 *                   "likes": 0,
 *                   "comments": 0,
 *                   "allComments": [{ "user": "User2", "comment": "Nice blog!" }],
 *                   "ownerId": "userId1",
 *                   "createdAt": "",
 *                   "updatedAt": ""
 *                 }
 *               ]
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               msg: "Error in getting the Blogs"
 */

// this api controller is used to get the Blogs of the all other Users for the loggedin user
// so that he can browse all other user's Blogs.
const browseBlogs = async (req, res) => {
    try {
        const userId = req.user.userid
        // basically we get the userId of the loggedIn user and
        // we are checking the condition on the Blogs that is 
        // get the Blogs of the Users other than the loggedin user.
        const resultBlogs = await Blogs.find({ ownerId: { $ne: userId } })
        res.status(200).json({ msg: resultBlogs })
    } catch (error) {
        res.status(500).json({ msg: 'Error in getting the Blogs' })
    }
}





/**
 * @swagger
 * /blog/likeblog:
 *   post:
 *     summary: Like a blog from other users
 *     tags: [Blogs]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blogId:
 *                 type: string
 *                 description: The ID of the blog to like.
 *     responses:
 *       200:
 *         description: Blog liked successfully
 *         content:
 *           application/json:
 *             example:
 *               msg: "Like Success"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               msg: "Error in liking the blog"
 */

// this api controller is run when the loggedIn user likes the Blogs of the other Users.
const likeBlog = async (req, res) => {
    try {
        const userId = req.user.userid
        const { blogId } = req.body
        const user = await Users.findOne({ _id: userId })

        // if the user already liked that blog simply sending a message.
        if (user.likedBlogs.includes(blogId))
            return res.json({ msg: 'You have already liked the blog' })

        // else getting the blog and updating the required fields.
        const blog = await Blogs.findOne({ _id: blogId })
        const blogUpdateResult = await Blogs.updateOne({ _id: blogId }, {
            $set: { likes: blog.likes + 1 }
        })

        // also adding the blogId of the blog into the loggedIn Users likedBlogs
        // so that we will have a track of the Blogs that the user liked.
        const userUpdateResult = await Users.updateOne({ _id: userId }, { $set: { likedBlogs: [...user.likedBlogs, blogId] } })

        if (blogUpdateResult && userUpdateResult)
            res.status(200).json({ msg: 'Like Success' })
        else
            res.status(500).json({ msg: 'Error in liking the blog' })
    } catch (error) {
        res.status(500).json({ msg: 'Error liking the blog' })
    }
}




/**
 * @swagger
 * /blog/commentonblog:
 *   post:
 *     summary: Comment on a blog
 *     tags: [Blogs]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blogId:
 *                 type: string
 *                 description: The ID of the blog to comment on.
 *               comment:
 *                 type: string
 *                 description: The comment text.
 *     responses:
 *       200:
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             example:
 *               msg: "Commented SuccessFully on the blog"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               msg: "Fill the comment field"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               msg: "Error commenting on the blog"
 */

// this api controller is run when the loggedIn user comments on the blog of the other user.
const commentOnBlog = async (req, res) => {
    try {
        const { comment, blogId } = req.body

        if (comment === '')
            return res.json({ msg: 'Fill the comment field' })

        const userId = req.user.userid
        const { username } = await Users.findOne({ _id: userId })
        const blog = await Blogs.findOne({ _id: blogId })
        const commentResponse = await Blogs.updateOne({ _id: blogId }, { $set: { comments: blog.comments + 1, allComments: [...blog.allComments, { username, comment }] } })

        if (commentResponse)
            res.status(200).json({ msg: 'Commented SuccessFully on the blog' })
        else
            res.status(500).json({ msg: 'Error commenting on the blog' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error commenting on the blog from error' })
    }
}


module.exports = { createBlog, editBlog, deleteBlog, getAllBlogs, getSingleBlog, browseBlogs, likeBlog, commentOnBlog }
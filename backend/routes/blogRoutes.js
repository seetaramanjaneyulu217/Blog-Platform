const router = require('express').Router()

const AuthorizeUser = require('../auth/authorize')
const { createBlog, getAllBlogs, getSingleBlog, editBlog, deleteBlog, browseBlogs, likeBlog, commentOnBlog } = require('../controllers/blogController')
const editBlogDetailsValidation = require('../middlewares/editBlogDetailsValidation')

router.route('/create').post(AuthorizeUser, createBlog)
router.route('/edit').put(editBlogDetailsValidation, AuthorizeUser, editBlog)
router.route('/delete').delete(AuthorizeUser, deleteBlog)
router.route('/getallblogs').get(AuthorizeUser, getAllBlogs)
router.route('/getblogbyid').post(AuthorizeUser, getSingleBlog)
router.route('/browseblogs').get(AuthorizeUser, browseBlogs)
router.route('/likeblog').post(AuthorizeUser, likeBlog)
router.route('/commentonblog').post(AuthorizeUser, commentOnBlog)

module.exports = router
const router = require('express').Router()

const AuthorizeUser = require('../auth/authorize')
const { createBlog, getAllBlogs, getSingleBlog, editBlog } = require('../controllers/blogController')

router.route('/create').post(AuthorizeUser, createBlog)
router.route('/edit').post(AuthorizeUser, editBlog)
router.route('/getallblogs').get(AuthorizeUser, getAllBlogs)
router.route('/getblogbyid').post(AuthorizeUser, getSingleBlog)

module.exports = router
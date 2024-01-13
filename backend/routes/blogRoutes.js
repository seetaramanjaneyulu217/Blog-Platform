const router = require('express').Router()

const AuthorizeUser = require('../auth/authorize')
const { createBlog, getAllBlogs } = require('../controllers/blogController')

router.route('/create').post(AuthorizeUser, createBlog)
router.route('/getallblogs').get(AuthorizeUser, getAllBlogs)

module.exports = router
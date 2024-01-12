const router = require('express').Router()

// imported User signup controllers
const { registerUser } = require('../controllers/userSignupController.js')

router.route('/signup').post(registerUser)

module.exports = router
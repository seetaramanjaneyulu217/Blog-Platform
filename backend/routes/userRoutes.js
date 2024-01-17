const router = require('express').Router()

// imported User signup controllers
const { registerUser, loginUser, logoutUser } = require('../controllers/userSignupController.js')
const loginDataValidation = require('../middlewares/loginDataValidation.js')

router.route('/signup').post(registerUser)
router.route('/login').post(loginDataValidation, loginUser)
router.route('/logout').post(logoutUser)

module.exports = router
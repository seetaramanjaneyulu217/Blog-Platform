const router = require('express').Router()

// imported User signup controllers
const { registerUser, loginUser } = require('../controllers/userSignupController.js')
const loginDataValidation = require('../middlewares/loginDataVAlidation.js')

router.route('/signup').post(registerUser)
router.route('/login').post(loginDataValidation, loginUser)

module.exports = router
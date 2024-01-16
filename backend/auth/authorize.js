const JWT = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

function AuthorizeUser(req, res, next) {

  const token = req.cookies.jwtToken
  
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET)
    req.user = decoded.user
    next()
  } catch (err) {
    return res.json({ msg: 'Unauthorized' })
  }
}

module.exports = AuthorizeUser
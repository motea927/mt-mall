const jwt = require('jsonwebtoken')
const User = require('../models/web/webUserModel')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    if (!token) throw new Error('登入錯誤')

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ _id: decoded._id, token })

    if (!user) throw new Error('登入錯誤')
    req.token = token
    req.user = user
    next()
  } catch (e) {
    res.status(401).send({ error: '登入錯誤' })
  }
}

module.exports = auth

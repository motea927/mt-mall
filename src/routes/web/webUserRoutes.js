const express = require('express')
const router = express.Router()
const webUserControllers = require('../../controllers/web/webUserControllers')
const webAuth = require('../../middleware/authWeb')
const adminAuth = require('../../middleware/authAdmin')

// web 只有註冊、登入、登出
router.post('/user', webUserControllers.create)
router.post('/user/login', webUserControllers.login)
router.post('/user/logout', webAuth, webUserControllers.logout)

module.exports = router

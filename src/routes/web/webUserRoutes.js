const express = require('express')
const router = express.Router()
const webUserControllers = require('../../controllers/web/webUserControllers')
const webAuth = require('../../middleware/authWeb')
const adminAuth = require('../../middleware/authAdmin')

// web 只有註冊、登入、登出
router.post('/user', webUserControllers.create)
router.post('/user/login', webUserControllers.login)
router.post('/user/logout', webAuth, webUserControllers.logout)

// 給後臺管理用
router.get('/user', adminAuth, webUserControllers.getAll)
router.patch('/user/:id', adminAuth, webUserControllers.patch)
router.delete('/user/:id', adminAuth, webUserControllers.delete)

module.exports = router

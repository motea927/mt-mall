const express = require('express')
const router = express.Router()
const webUserControllers = require('../../controllers/web/webUserControllers')
const adminAuth = require('../../middleware/authAdmin')

// 後臺管理APP會員
router.post('/user', webUserControllers.create)
router.get('/user', adminAuth, webUserControllers.getAllWithAdmin)
router.patch('/user/:id', adminAuth, webUserControllers.patchWithAdmin)
router.delete('/user/:id', adminAuth, webUserControllers.deleteWithAdmin)

module.exports = router

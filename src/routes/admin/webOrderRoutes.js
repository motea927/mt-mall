const express = require('express')
const router = express.Router()
const webOrderControllers = require('../../controllers/web/webOrderControllers')
const adminAuth = require('../../middleware/authAdmin')

// web 查詢訂單
router.get('/order', adminAuth, webOrderControllers.getAllWithAdmin)

module.exports = router

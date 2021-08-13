const express = require('express')
const router = express.Router()
const webOrderControllers = require('../../controllers/web/webOrderControllers')
const webAuth = require('../../middleware/authWeb')
const adminAuth = require('../../middleware/authAdmin')

// web 查詢訂單
// router.get('/product', webProductControllers.getAll)

// 給後臺管理用、增、查詢

router.post('/order', webAuth, webOrderControllers.create)

module.exports = router

const express = require('express')
const router = express.Router()
const webProductControllers = require('../../controllers/web/webProductControllers')

// web、後臺通用 查詢商品
router.get('/product', webProductControllers.getAll)

module.exports = router

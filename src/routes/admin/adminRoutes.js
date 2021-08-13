const express = require('express')
const router = express.Router()

const adminSuperUserRoutes = require('./adminSuperUserRoutes')
const webUserRoutes = require('./webUserRoutes')
const webCategoriesRoutes = require('./webCategoriesRoutes')
const webProductRoutes = require('./webProductRoutes')

router.use(adminSuperUserRoutes)

// 後臺管理APP會員
router.use(webUserRoutes)

// 後臺管理APP商品類別
router.use(webCategoriesRoutes)

// 後臺管理APP商品
router.use(webProductRoutes)

module.exports = router

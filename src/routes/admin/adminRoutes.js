const express = require('express')
const router = express.Router()

const adminSuperUserRoutes = require('./adminSuperUserRoutes')
const webUserRoutes = require('./webUserRoutes')
const webCategoriesRoutes = require('./webCategoriesRoutes')
const webProductRoutes = require('./webProductRoutes')
const webOrderRoutes = require('./webOrderRoutes')

// 後臺管理者
router.use(adminSuperUserRoutes)

// 後臺管理 APP會員
router.use(webUserRoutes)

// 後臺管理 APP商品類別
router.use(webCategoriesRoutes)

// 後臺管理 APP商品
router.use(webProductRoutes)

// 後臺管理 APP訂單
router.use(webOrderRoutes)

module.exports = router

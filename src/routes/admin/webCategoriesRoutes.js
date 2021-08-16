const express = require('express')
const router = express.Router()
const webCategoriesControllers = require('../../controllers/web/webCategoriesControllers')

const adminAuth = require('../../middleware/authAdmin')

// 給後臺管理APP 商品類別
router.get('/categories', webCategoriesControllers.getAll)
router.post('/categories', adminAuth, webCategoriesControllers.create)
router.patch('/categories/:id', adminAuth, webCategoriesControllers.patch)
router.delete('/categories/:id', adminAuth, webCategoriesControllers.delete)

module.exports = router

const express = require('express')
const router = express.Router()
const webCategoriesControllers = require('../../controllers/web/webCategoriesControllers')

// web、後臺通用 只有查詢分類
router.get('/categories', webCategoriesControllers.getAllWithWebUser)

module.exports = router

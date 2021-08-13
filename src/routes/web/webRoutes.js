const express = require('express')
const router = express.Router()

const webUserRoutes = require('./webUserRoutes')
const webCategoriesRoutes = require('./webCategoriesRoutes')
const webProductRoutes = require('./webProductRoutes')
const webOrderRoutes = require('./webOrderRoute')

router.use(webUserRoutes)
router.use(webCategoriesRoutes)
router.use(webProductRoutes)
router.use(webOrderRoutes)

module.exports = router

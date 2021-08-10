const express = require('express')
const router = express.Router()

const webUserRoutes = require('./webUserRoutes')

router.use(webUserRoutes)

module.exports = router

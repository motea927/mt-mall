const express = require('express')
const router = express.Router()

const adminUserRoutes = require('./adminUserRoutes')

router.use(adminUserRoutes)

module.exports = router

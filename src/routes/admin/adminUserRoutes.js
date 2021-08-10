const express = require('express')
const router = express.Router()
const adminUserControllers = require('../../controllers/admin/adminUserControllers')
const auth = require('../../middleware/authAdmin')

if (process.env.mode === 'dev') {
  router.post('/user', adminUserControllers.create)
} else {
  router.post('/user', auth, adminUserControllers.create)
}

router.post('/user/login', adminUserControllers.login)
router.post('/user/logout', auth, adminUserControllers.logout)

router.get('/user', auth, adminUserControllers.getAll)
router.patch('/user/:id', auth, adminUserControllers.patch)
router.delete('/user', auth, adminUserControllers.delete)

module.exports = router

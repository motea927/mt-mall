const express = require('express')
const router = express.Router()
const adminSuperUserControllers = require('../../controllers/admin/adminSuperUserControllers')
const auth = require('../../middleware/authAdmin')

if (process.env.mode === 'dev') {
  router.post('/superuser', adminSuperUserControllers.create)
} else {
  router.post('/superuser', auth, adminSuperUserControllers.create)
  // router.post('/superuser', adminSuperUserControllers.create)
}

router.post('/superuser/login', adminSuperUserControllers.login)
router.post('/superuser/logout', auth, adminSuperUserControllers.logout)

router.get('/superuser', auth, adminSuperUserControllers.getAll)
router.get('/superuser/Info', auth, adminSuperUserControllers.getInfo)
router.patch('/superuser/:id', auth, adminSuperUserControllers.patch)
router.delete('/superuser', auth, adminSuperUserControllers.delete)

module.exports = router

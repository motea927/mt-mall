const express = require('express')
const router = express.Router()
const multer = require('multer')
const webProductControllers = require('../../controllers/web/webProductControllers')
const adminAuth = require('../../middleware/authAdmin')

// 給後臺管理APP商品用、增刪改
const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    const reg = /\.(jpg|jpeg|png)/
    if (!file.originalname.match(reg)) {
      return cb(new Error('僅支援jpg、jpeg、png'))
    }
    cb(undefined, cb)
  }
})

router.post(
  '/product',
  adminAuth,
  upload.single('image'),
  webProductControllers.createWithAdmin
)

router.patch(
  '/product/:id',
  adminAuth,
  upload.single('image'),
  webProductControllers.patchWithAdmin
)

router.get('/product', webProductControllers.getAll)

router.delete('/product/:id', adminAuth, webProductControllers.deleteWithAdmin)

module.exports = router

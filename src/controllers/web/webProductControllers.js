const Product = require('../../models/web/webProductModel')
const Category = require('../../models/web/webCategoriesModel')
const fs = require('fs')
// const fsPromises = fs.promises
const path = require('path')

module.exports = {
  async createWithAdmin(req, res, next) {
    try {
      req.body.image = `/uploads/${req.file.filename}`

      const product = new Product(req.body)
      const categoryId = req.body.categoryId
      const category = await Category.findById(categoryId)
      product.category = category.category
      await product.save()
      category.count++
      await category.save()
      res.status(201).send(product)
    } catch (e) {
      const fileName = req.file ? req.file.filename : ''
      await fs.unlink(
        path.join(__dirname, `../../uploads/${fileName}`),
        err => {
          if (err) return res.status(400).send()
        }
      )
      res.status(400).send(e)
    }
  },
  async getAll(req, res, next) {
    try {
      const productLists = await Product.find({}, null, {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip)
      })

      res.send(productLists)
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async patchWithAdmin(req, res, next) {
    const updates = Object.keys(req.body)
    const allowUpdates = [
      'title',
      'price',
      'description',
      'categoryId',
      'image'
    ]
    const isValidOperation = updates.every(update =>
      allowUpdates.includes(update)
    )

    if (!isValidOperation)
      return res.status(400).send({ error: '欄位不可修改' })

    try {
      const product = await Product.findById(req.params.id)
      if (!product) return res.status(404).send('未找到該商品')
      updates.forEach(update => (product[update] = req.body[update]))
      let originalImage = ''
      if (req.file) {
        originalImage = product.image
        product.image = `/uploads/${req.file.filename}`
      }

      await product.save()

      if (req.file) {
        // Delete Image
        await fs.unlink(
          path.join(__dirname, `../..${originalImage}`),
          err => {}
        )
      }
      res.send(product)
    } catch (e) {
      if (req.body.file) {
        await fs.unlink(
          path.join(__dirname, `../../uploads/${req.file.filename}`),
          err => {
            if (err) return res.status(404).send()
          }
        )
      }
      res.status(404).send(e)
    }
  },
  async deleteWithAdmin(req, res, next) {
    try {
      const product = await Product.findById(req.params.id)
      if (!product) return res.status(404).send('未找到該商品類別')
      await product.remove()

      //
      const categoryId = product.categoryId
      const category = await Category.findById(categoryId)
      category.count--
      await category.save()
      await fs.unlink(path.join(__dirname, `../../${product.image}`), err => {})
      res.send(product)
    } catch (e) {
      res.status(500).send(e)
    }
  }
}

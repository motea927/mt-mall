const Product = require('../../models/web/webProductModel')
const Category = require('../../models/web/webCategoriesModel')
const ImageModel = require('../../models/image')
const mongoose = require('mongoose')
module.exports = {
  async createWithAdmin(req, res, next) {
    try {
      const fileName = new mongoose.Types.ObjectId()
      req.body.image = `/uploads/${fileName}`
      const product = new Product(req.body)
      const categoryId = req.body.categoryId
      const category = await Category.findById(categoryId)
      product.category = category.category
      await product.save()
      category.count++
      await category.save()

      const image = await new ImageModel({
        fileName: fileName,
        image: req.file.buffer
      })
      await image.save()
      res.status(201).send(product)
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async getAll(req, res, next) {
    try {
      const page = req.query._page ? parseInt(req.query._page) - 1 : 0
      const sortParams = {}
      const match = {}

      if (req.query._sort) {
        sortParams[req.query._sort] = req.query._order || 'desc'
      }

      if (req.query.category) {
        match.category = req.query.category
      }

      if (req.query._id) {
        match._id = new mongoose.Types.ObjectId(req.query._id)
      }

      const productLists = await Product.find(match, null, {
        limit: parseInt(req.query._limit) || parseInt(req.query.limit),
        skip: page || parseInt(req.query.skip)
      }).sort(sortParams)
      const count = await Product.countDocuments({})

      res.header('Access-Control-Expose-Headers', 'x-total-count')
      res.set('x-total-count', count)
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
      const oldFileName = product.image.replace('/uploads/', '')
      updates.forEach(update => (product[update] = req.body[update]))

      let image
      if (req.file) {
        image = await ImageModel.findOne({ fileName: oldFileName })
        if (!image) res.status(404).send()

        const newFileName = new mongoose.Types.ObjectId()
        image.fileName = newFileName
        image.image = req.file.buffer
        product.image = `/uploads/${newFileName}`
      }

      await product.save()

      if (req.file) {
        await image.save()
      }
      res.send(product)
    } catch (e) {
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

      if (product.sales === 0) {
        await ImageModel.findOneAndDelete({
          fileName: product.image.replace('/uploads', '')
        })
      }

      res.send(product)
    } catch (e) {
      res.status(500).send(e)
    }
  }
}

const Categories = require('../../models/web/webCategoriesModel')
const Product = require('../../models/web/webProductModel')
const path = require('path')
const fs = require('fs')
const fsPromises = fs.promises

module.exports = {
  async create(req, res, next) {
    const category = new Categories(req.body)

    try {
      await category.save()
      res.status(201).send(category)
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async getAll(req, res, next) {
    try {
      const categoryLists = await Categories.find({}, null, {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip)
      })

      res.send(categoryLists)
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async patch(req, res, next) {
    const updates = Object.keys(req.body)
    const allowUpdates = ['category', 'isEnable']
    const isValidOperation = updates.every(update =>
      allowUpdates.includes(update)
    )
    if (!isValidOperation)
      return res.status(400).send({ error: '欄位不可修改' })

    try {
      const category = await Categories.findById(req.params.id)
      if (!category) return res.status(404).send('未找到該商品類別')
      updates.forEach(update => (category[update] = req.body[update]))
      await category.save()

      res.send(category)
    } catch (e) {
      res.status(404).send(e)
    }
  },
  async delete(req, res, next) {
    try {
      const categoryId = req.params.id
      const category = await Categories.findById(categoryId)
      if (!category) return res.status(404).send('未找到該商品類別')

      await category.remove()
      const productLists = await Product.find({
        categoryId
      })

      await Product.deleteMany({
        categoryId
      })

      for (const product of productLists) {
        await fsPromises.unlink(
          path.join(__dirname + '../../..') + product.image
        )
      }

      res.send(category)
    } catch (e) {
      res.status(500).send(e)
    }
  }
}

const mongoose = require('mongoose')
const Categories = require('../../models/web/webCategoriesModel')
const Product = require('../../models/web/webProductModel')
const ImageModel = require('../../models/image')

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
  async getAllWithAdmin(req, res, next) {
    try {
      const page = req.query._page ? req.query._page - 1 : 0
      const categoryLists = await Categories.find({}, null, {
        limit: parseInt(req.query._limit),
        skip: parseInt(req.query._limit) * page
      })
      const count = await Categories.countDocuments({})
      res.header('Access-Control-Expose-Headers', 'x-total-count')
      res.set('x-total-count', count)
      res.send(categoryLists)
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async getAllWithWebUser(req, res, next) {
    try {
      const page = req.query._page ? req.query._page - 1 : 0
      const categoryLists = await Categories.find(
        {
          isEnable: true,
          count: {
            $gte: 1
          }
        },
        null,
        {
          limit: parseInt(req.query._limit),
          skip: parseInt(req.query._limit) * page
        }
      )
      const allProductCount = await Product.countDocuments({
        isEnable: true
      })

      res.send([
        { category: '所有商品', count: allProductCount },
        ...categoryLists
      ])
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

      if (updates.includes('category') || updates.includes('isEnable')) {
        const productLists = await Product.find({
          categoryId: new mongoose.Types.ObjectId(req.params.id)
        })
        const reqCategory = req.body.category
        const reqIsEnable = req.body.isEnable

        for (let productItem of productLists) {
          productItem.category = reqCategory || category.category
          productItem.isEnable =
            reqIsEnable || reqIsEnable === false
              ? reqIsEnable
              : category.isEnable
          await productItem.save()
        }
      }

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
        await ImageModel.findOneAndDelete({
          fileName: product.image.replace('/uploads/', '')
        })
      }
      res.send(category)
    } catch (e) {
      res.status(500).send(e)
    }
  }
}

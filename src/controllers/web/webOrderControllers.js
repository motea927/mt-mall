const Order = require('../../models/web/webOrderModel')
const ProductModel = require('../../models/web/webProductModel')
const dayjs = require('dayjs')

module.exports = {
  async create(req, res, next) {
    try {
      const order = new Order(req.body)
      order.date = dayjs().format('YYYY-MM-DD')
      // 算金額與前端符合不符合
      const totalPrice = await order.cart.reduce(
        async (accumulator, currentValue) => {
          const product = await ProductModel.findById(currentValue.id)
          return accumulator + product.price * currentValue.count
        },
        0
      )

      if (totalPrice !== order.totalPrice) {
        return res.status(400).send('商品金額錯誤，請重新整理')
      }

      await order.save()
      // 存完加銷售量
      for (let cartItem of order.cart) {
        const product = await ProductModel.findById(cartItem.id)
        product.sales += cartItem.count
        await product.save()
      }
      res.status(201).send(order)
    } catch (e) {
      console.log(e)
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
  }
}

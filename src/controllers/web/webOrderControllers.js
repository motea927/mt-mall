const Order = require('../../models/web/webOrderModel')
const ProductModel = require('../../models/web/webProductModel')
const WebUserModel = require('../../models/web/webUserModel')
const dayjs = require('dayjs')
const validator = require('validator')

module.exports = {
  async create(req, res, next) {
    try {
      const order = new Order(req.body)
      order.date = dayjs().format('YYYY-MM-DD')
      // 算金額與前端符合不符合
      const totalPrice = await order.cart.reduce(
        async (accumulator, currentValue) => {
          const product = await ProductModel.findById(currentValue._id)
          return (await accumulator) + product.price * currentValue.count
        },
        0
      )

      if (totalPrice !== order.totalPrice) {
        return res.status(400).send('商品金額錯誤，請重新整理')
      }

      const { cardCvc, cardExpMonth, cardExpYear, cardNo } =
        order.purchaseInformation

      // 驗信用卡
      if (!cardCvc || cardCvc.length !== 3) {
        return res.status(400).send('請輸入三碼安全碼')
      }

      if (!cardExpMonth) return res.status(400).send('請輸入兩碼月份')
      if (cardExpMonth.length !== 2) return res.status(400).send('月份需爲兩碼')
      if (+cardExpMonth <= 0 || +cardExpMonth > 12)
        return res.status(400).send('月份錯誤')

      if (!cardExpYear) return res.status(400).send('請輸入兩碼年份')
      if (cardExpYear.length !== 2) return res.status(400).send('年份需爲兩碼')
      if (+cardExpYear < +dayjs().format('YY'))
        return res.status(400).send('年份錯誤')

      if (!cardNo) return res.status(400).send('請輸入卡號')
      const number = cardNo.replace(/-/g, '')

      if (!validator.isCreditCard(number) && number !== '4000221111111111')
        return res.status(400).send('卡號格式錯誤')

      // todo 串金流
      // 隱藏卡號、敏感資訊
      order.purchaseInformation.cardCvc = '***'
      order.purchaseInformation.cardExpMonth = '**'
      order.purchaseInformation.cardExpYear = '**'
      order.purchaseInformation.cardNo = `${number.substr(
        0,
        2
      )}**-****-****-${number.substr(-4)}`

      await order.save()
      // 存完加銷售量
      for (let cartItem of order.cart) {
        const product = await ProductModel.findById(cartItem.id)
        product.sales += cartItem.count
        await product.save()
      }
      res.status(201).send(order)
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async getAllWithUser(req, res, next) {
    try {
      await req.user
        .populate({
          path: 'order'
        })
        .execPopulate()

      res.send(req.user.order)
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async getAllWithAdmin(req, res, next) {
    try {
      const page = req.query._page ? req.query._page - 1 : 0
      const orderLists = await Order.find({}, null, {
        limit: parseInt(req.query._limit),
        skip: parseInt(req.query._limit) * page
      })
        .lean()
        .exec()

      for (let order of orderLists) {
        const user = await WebUserModel.findById(order.userId)
        if (!user) continue
        order.user = user
      }

      const count = await Order.countDocuments({})

      res.header('Access-Control-Expose-Headers', 'x-total-count')
      res.set('x-total-count', count)
      res.send(orderLists)
    } catch (e) {
      res.status(400).send(e)
    }
  }
}

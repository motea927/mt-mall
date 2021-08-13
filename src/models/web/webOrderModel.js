const mongoose = require('mongoose')
const validator = require('validator')
const dayjs = require('dayjs')

const webOrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'WebUser'
    },
    lastName: { type: String, required: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    phone: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isMobilePhone(value, ['zh-TW'])) {
          throw new Error('手機格式錯誤')
        }
      }
    },
    address: { type: String, required: true, trim: true },
    cardLastName: { type: String, required: true, trim: true },
    cardFirstName: { type: String, required: true, trim: true },
    cardExpMonth: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length !== 2) throw new Error('月份需爲兩碼')
        if (+value <= 0 || +value > 12) throw new Error('月份錯誤')
      }
    },
    cardExpYear: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length !== 2) throw new Error('年份需爲兩碼')
        if (+value < +dayjs().format('YY')) throw new Error('年份錯誤')
      }
    },
    cardCvc: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length !== 3) throw new Error('安全碼需爲三碼')
      }
    },
    cardNo: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value === '4000221111111111') return
        if (!validator.isCreditCard(value)) throw new Error('卡號格式錯誤')
      }
    },
    cart: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'WebProduct'
        },
        count: {
          type: Number,
          required: true
        }
      }
    ],
    totalPrice: { type: Number, required: true },
    date: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const Order = mongoose.model('WebOrder', webOrderSchema)

module.exports = Order

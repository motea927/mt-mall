const mongoose = require('mongoose')
const validator = require('validator')
const dayjs = require('dayjs')

const webOrderSchema = new mongoose.Schema(
  {
    cart: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'WebProduct'
        },
        count: {
          type: Number,
          required: true
        },
        title: {
          type: String,
          required: true,
          trim: true
        },
        price: {
          type: Number,
          require: true,
          validate(value) {
            if (value <= 0) {
              throw new Error('價格需大於0')
            }
          }
        },
        description: {
          type: String,
          require: true
        },
        categoryId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'WebCategories'
        },
        category: {
          type: String,
          require: true
        },
        image: {
          type: String
        },
        sales: {
          type: Number,
          default: 0
        }
      }
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'WebUser'
    },
    purchaseInformation: {
      address: { type: String, required: true, trim: true },
      cardCvc: {
        type: String,
        required: true,
        trim: true
      },
      cardExpMonth: {
        type: String,
        required: true,
        trim: true
      },
      cardExpYear: {
        type: String,
        required: true,
        trim: true
      },
      cardLastName: { type: String, required: true, trim: true },
      cardFirstName: { type: String, required: true, trim: true },
      cardNo: {
        type: String,
        required: true,
        trim: true
      },
      firstName: { type: String, required: true, trim: true },
      lastName: { type: String, required: true, trim: true },
      phone: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
          const number = value.replace(/-/g, '')
          if (!validator.isMobilePhone(number, ['zh-TW'])) {
            throw new Error('手機格式錯誤')
          }
        }
      }
    },
    totalPrice: { type: Number, required: true },
    date: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const Order = mongoose.model('WebOrder', webOrderSchema)

module.exports = Order

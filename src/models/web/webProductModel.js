const mongoose = require('mongoose')

const webProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxLength: 4
    },
    price: {
      type: Number,
      required: true,
      validate(value) {
        if (value <= 0) {
          throw new Error('價格需大於0')
        }
      }
    },
    description: {
      type: String,
      required: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'WebCategories'
    },
    category: {
      type: String
    },
    isEnable: {
      type: Boolean
    },
    image: {
      type: String
    },
    sales: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

const Product = mongoose.model('WebProduct', webProductSchema)

module.exports = Product

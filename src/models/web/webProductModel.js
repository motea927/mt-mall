const mongoose = require('mongoose')

const webProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true
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
      type: String
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'WebCategories'
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

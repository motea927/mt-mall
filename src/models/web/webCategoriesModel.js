const mongoose = require('mongoose')

const webCategoriesSchema = new mongoose.Schema(
  {
    category: { type: String, required: true, trim: true, unique: true },
    count: { type: Number, default: 0 },
    isEnable: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
)

const Categories = mongoose.model('WebCategories', webCategoriesSchema)

module.exports = Categories

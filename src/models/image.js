const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    image: { type: Buffer, required: true }
  },
  {
    timestamps: true
  }
)

const Image = mongoose.model('Image', imageSchema)

module.exports = Image

const ImageModel = require('../models/image')

module.exports = {
  async getImage(req, res, next) {
    const fileName = req.params.fileName

    try {
      const image = await ImageModel.findOne({ fileName })
      if (!image) return res.status(404).send()
      res.set('Content-Type', 'image/png')
      res.send(image.image)
    } catch (e) {
      res.status(404).send()
    }
  }
}

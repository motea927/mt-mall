const User = require('../../models/web/webUserModel')

module.exports = {
  async create(req, res, next) {
    const user = new User(req.body)

    try {
      const token = await user.generateAuthToken()
      user.token = token
      await user.save()

      res.status(201).send(user)
    } catch (e) {
      res.status(400).send(e)
    }
  },

  async login(req, res, next) {
    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      )

      await user.generateAuthToken()
      res.send(user)
    } catch (e) {
      res.status(404).send('帳號或密碼錯誤')
    }
  },
  async logout(req, res, next) {
    try {
      req.user.token = ''
      await req.user.save()
      res.send()
    } catch (e) {
      res.status(500).send()
    }
  },
  async getAllWithAdmin(req, res, next) {
    try {
      const page = req.query._page ? req.query._page - 1 : 0
      const userLists = await User.find({}, null, {
        limit: parseInt(req.query._limit),
        skip: parseInt(req.query._limit) * page
      })
      const count = await User.countDocuments({})

      res.header('Access-Control-Expose-Headers', 'x-total-count')
      res.set('x-total-count', count)
      res.send(userLists)
    } catch (e) {
      res.status(400).send(e)
    }
  },
  async patchWithAdmin(req, res, next) {
    const updates = Object.keys(req.body)
    const allowUpdates = ['name', 'password']
    const isValidOperation = updates.every(update =>
      allowUpdates.includes(update)
    )
    if (!isValidOperation)
      return res.status(400).send({ error: '欄位不可修改' })

    try {
      const user = await User.findById(req.params.id)
      if (!user) return res.status(404).send('未找到使用者')
      updates.forEach(update => (user[update] = req.body[update]))
      await user.save()

      res.send(user)
    } catch (e) {
      res.status(404).send(e)
    }
  },
  async deleteWithAdmin(req, res, next) {
    try {
      const user = await User.findById(req.params.id)
      if (!user) return res.status(404).send('未找到使用者')
      await user.remove()

      res.send(user)
    } catch (e) {
      res.status(500).send(e)
    }
  }
}

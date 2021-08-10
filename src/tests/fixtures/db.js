const mongoose = require('mongoose')

const AdminUser = require('../../models/admin/adminUserModel')
const adminUserOneId = new mongoose.Types.ObjectId()
const adminUserOne = {
  _id: adminUserOneId,
  name: 'mike',
  account: 'motea927',
  password: 'test1234'
}

const WebUser = require('../../models/web/webUserModel')
const webUserOneId = new mongoose.Types.ObjectId()
const webUserOne = {
  _id: webUserOneId,
  name: 'morty',
  email: 'motea927@gggg.com.tw',
  password: 'test1234',
  token: ''
}

const setupDatabase = async () => {
  // Admin user
  await AdminUser.deleteMany()
  const adminOne = new AdminUser(adminUserOne)
  const adminUserToken = await adminOne.generateAuthToken()
  adminUserOne.token = adminUserToken
  await adminOne.save()

  // Web user
  await WebUser.deleteMany()
  const webOne = new WebUser(webUserOne)
  const webUserToken = await webOne.generateAuthToken()
  webUserOne.token = webUserToken
  await webOne.save()
}

module.exports = {
  setupDatabase,
  adminUserOneId,
  adminUserOne,
  webUserOneId,
  webUserOne
}

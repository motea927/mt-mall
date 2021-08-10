const mongoose = require('mongoose')
const AdminUser = require('../../models/admin/adminUserModel')

const adminUserOneId = new mongoose.Types.ObjectId()
const adminUserOne = {
  _id: adminUserOneId,
  name: 'mike',
  account: 'motea927',
  password: 'test1234'
}

const setupDatabase = async () => {
  await AdminUser.deleteMany()
  const adminOne = new AdminUser(adminUserOne)
  const token = await adminOne.generateAuthToken()
  adminUserOne.token = token
  await adminOne.save()
}

module.exports = {
  setupDatabase,
  adminUserOneId,
  adminUserOne
}

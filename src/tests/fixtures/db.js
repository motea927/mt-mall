const mongoose = require('mongoose')
const fs = require('fs')
const fsPromises = fs.promises
const path = require('path')
const request = require('supertest')
const app = require('../../app')

const AdminUser = require('../../models/admin/adminSuperUserModel')
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

const WebCategories = require('../../models/web/webCategoriesModel')
const webCategoryOneId = new mongoose.Types.ObjectId()

const webCategoryOne = {
  _id: webCategoryOneId,
  category: '咖啡',
  count: 0,
  isEnable: true
}

const WebProduct = require('../../models/web/webProductModel')

const webProductOneId = new mongoose.Types.ObjectId()
const webProductOne = {
  _id: webProductOneId,
  title: '楓糖拿鐵',
  price: 500,
  description:
    '綿密奶泡上的楓糖氣息撲鼻而來，接著是濃醇的咖啡及牛奶香，慢慢品嘗、細細感受楓糖的香甜與拿鐵融合出的典雅細緻！',
  categoryId: webCategoryOneId,
  sales: 0
}

const WebOrder = require('../../models/web/webOrderModel')
const setupDatabase = async () => {
  // Super User
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

  // Web Categories
  await WebCategories.deleteMany()
  await new WebCategories(webCategoryOne).save()

  // Web Product
  const files = await fsPromises.readdir(
    path.join(__dirname + '../../../uploads/')
  )

  for (const file of files) {
    await fsPromises.unlink(
      path.join(path.join(__dirname + '../../../uploads/'), file)
    )
  }

  await WebProduct.deleteMany()
  await new WebProduct(webProductOne).save()

  // Web Order
  await WebOrder.deleteMany()
}

module.exports = {
  setupDatabase,
  adminUserOneId,
  adminUserOne,
  webUserOneId,
  webUserOne,
  webCategoryOneId,
  webCategoryOne,
  webProductOne
}

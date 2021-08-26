const mongoose = require('mongoose')
const fs = require('fs')
const fsPromise = fs.promises

const path = require('path')
const ImageModel = require('../../models/image')
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

const webCategoryTwoId = new mongoose.Types.ObjectId()
const webCategoryTwo = {
  _id: webCategoryTwoId,
  category: '拿鐵',
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
  isEnable: webCategoryOne.isEnable,
  sales: 0,
  image: '/uploads/gg1'
}

const webProductTwoId = new mongoose.Types.ObjectId()
const webProductTwo = {
  _id: webProductTwoId,
  title: '草莓拿鐵',
  price: 20,
  description: '123',
  categoryId: webCategoryOneId,
  isEnable: webCategoryOne.isEnable,
  sales: 0,
  image: '/uploads/gg2'
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
  // const image = await new ImageModel({
  //   fileName: fileName,
  //   image: req.file.buffer
  // })

  await new WebCategories(webCategoryOne).save()
  await new WebCategories(webCategoryTwo).save()

  // Web Product
  await ImageModel.deleteMany()
  await WebProduct.deleteMany()
  const imageBuffer = await fsPromise.readFile(path.join(__dirname, './gg.png'))
  await new ImageModel({
    fileName: 'gg1',
    image: imageBuffer
  }).save()

  await new ImageModel({
    fileName: 'gg2',
    image: imageBuffer
  }).save()

  await new WebProduct(webProductOne).save()
  await new WebProduct(webProductTwo).save()

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
  webCategoryTwoId,
  webCategoryTwo,
  webProductOneId,
  webProductOne,
  webProductTwoId,
  webProductTwo
}

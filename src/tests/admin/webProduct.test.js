const request = require('supertest')
const app = require('../../app')
const path = require('path')

const webProductModel = require('../../models/web/webProductModel')

const {
  setupDatabase,
  adminUserOne,
  webCategoryOneId,
  webProductOneId,
  webProductOne
} = require('../fixtures/db')

beforeEach(setupDatabase)

// Admin CRUD APP Product

test('Should create product with correct admin', async () => {
  const newProduct = {
    title: '測試商品',
    price: 25,
    description: '描述',
    categoryId: webCategoryOneId,
    image: '/uploads/gg'
  }

  const response = await request(app)
    .post('/admin/product')
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .attach('image', path.join(__dirname, '../fixtures/gg.png'))
    .field('title', newProduct.title)
    .field('price', newProduct.price)
    .field('description', newProduct.description)
    .field('categoryId', String(newProduct.categoryId))
    .expect(201)
})

test('Should Not create product with wrong admin', async () => {
  const newProduct = {
    title: '測試商品',
    price: 25,
    description: '描述',
    categoryId: webCategoryOneId,
    image: '/uploads/gg'
  }

  const response = await request(app)
    .post('/admin/product')
    .set('Authorization', `Bearer 123`)
    .field('title', newProduct.title)
    .field('price', newProduct.price)
    .field('description', newProduct.description)
    .field('categoryId', String(newProduct.categoryId))
    .expect(401)
})

test('Should Not create product when missing field', async () => {
  const newProduct = {
    title: '測試商品',
    price: 25,
    description: '描述',
    categoryId: webCategoryOneId,
    image: '/uploads/gg'
  }

  const response = await request(app)
    .post('/admin/product')
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .attach('image', path.join(__dirname, '../fixtures/gg.png'))
    .field('title', newProduct.title)
    .field('description', newProduct.description)
    .field('categoryId', String(newProduct.categoryId))
    .expect(400)
})

test('Should not create product with long title', async () => {
  const newProduct = {
    title: '超過四個字',
    price: 25,
    description: '描述',
    categoryId: webCategoryOneId,
    image: '/uploads/gg'
  }

  const response = await request(app)
    .post('/admin/product')
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .attach('image', path.join(__dirname, '../fixtures/gg.png'))
    .field('title', newProduct.title)
    .field('price', newProduct.price)
    .field('description', newProduct.description)
    .field('categoryId', String(newProduct.categoryId))
    .expect(400)
})

test('Should get product lists', async () => {
  const response = await request(app).get('/admin/product').expect(200)
  expect(response.body.length).toBe(2)
})

test('Should update product with correct admin', async () => {
  const title = '新拿鐵'
  const newPrice = 999999
  const response = await request(app)
    .patch(`/admin/product/${webProductOneId}`)
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .attach('image', path.join(__dirname, '../fixtures/gg.png'))
    .field('title', title)
    .field('price', newPrice)
    .expect(200)

  const updatedProduct = await webProductModel.findById(webProductOneId)

  expect(updatedProduct.title).toBe(title)
  expect(updatedProduct.price).toBe(newPrice)
})

test('Should not update product with error categoryId', async () => {
  const title = 'new title'
  const newPrice = 999999
  const response = await request(app)
    .patch(`/admin/product/${webProductOneId}`)
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .attach('image', path.join(__dirname, '../fixtures/gg.png'))
    .field('title', title)
    .field('price', newPrice)
    .field('categoryId', '123safda')
    .expect(404)
})

test('Should not update product with wrong admin', async () => {
  const title = 'new title'
  const newPrice = 999999
  const response = await request(app)
    .patch(`/admin/product/${webProductOneId}`)
    .set('Authorization', `Bearer 2124`)
    .attach('image', path.join(__dirname, '../fixtures/gg.png'))
    .field('title', title)
    .field('price', newPrice)
    .expect(401)
})

test('Should delete product with correct admin', async () => {
  const response = await request(app)
    .delete(`/admin/product/${webProductOneId}`)
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .expect(200)
  const deletedProduct = await webProductModel.findById(webProductOneId)

  expect(deletedProduct).toBeNull()
})

test('Should Not delete product with wrong admin', async () => {
  const response = await request(app)
    .delete(`/admin/product/${webProductOneId}`)
    .set('Authorization', `Bearer wrong`)
    .expect(401)

  const notDeletedProduct = await webProductModel.findById(webProductOneId)

  expect(notDeletedProduct.title).toBe(webProductOne.title)
})

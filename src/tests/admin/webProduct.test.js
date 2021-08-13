const request = require('supertest')
const app = require('../../app')
const path = require('path')

const {
  setupDatabase,
  adminUserOne,
  webCategoryOneId,
  webProductOne
} = require('../fixtures/db')

beforeEach(setupDatabase)

test('Should create product with correct admin', async () => {
  const newProduct = {
    title: '花式摩卡',
    price: 500,
    description:
      '濃濃的巧克力與豐郁的咖啡及滑順的鮮奶調和，杯口擠上冷冽細緻的鮮奶油和巧克力醬，口感濃醇香而不膩！！',
    categoryId: webCategoryOneId,
    sales: 0
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

test('Should not create product with empty image', async () => {
  const newProduct = {
    title: '花式摩卡',
    price: 500,
    description:
      '濃濃的巧克力與豐郁的咖啡及滑順的鮮奶調和，杯口擠上冷冽細緻的鮮奶油和巧克力醬，口感濃醇香而不膩！！',
    categoryId: webCategoryOneId,
    sales: 0
  }

  const response = await request(app)
    .post('/admin/product')
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .field('title', newProduct.title)
    .field('price', newProduct.price)
    .field('description', newProduct.description)
    .field('categoryId', String(newProduct.categoryId))
    .expect(400)
})

test('Should not create product with same title', async () => {
  const response = await request(app)
    .post('/admin/product')
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .field('title', webProductOne.title)
    .field('price', webProductOne.price)
    .field('description', webProductOne.description)
    .field('categoryId', String(webCategoryOneId))
    .expect(400)
})

test('Should get product lists', async () => {
  const response = await request(app).get('/web/product').expect(200)

  expect(response.body.length).toBe(1)
  expect(response.body[0].title).toBe(webProductOne.title)
})

test('Should update product with valid field with admin', async () => {
  const response = await request(app)
    .patch(`/admin/product/${webProductOne._id}`)
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .send({
      title: 'gg',
      price: 200,
      description: 'gg',
      categoryId: webCategoryOneId
    })
    .expect(200)
})

test('Should update image with admin', async () => {
  const response = await request(app)
    .patch(`/admin/product/${webProductOne._id}`)
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .attach('image', path.join(__dirname, '../fixtures/gg.png'))
    .expect(200)
})

test('Should delete product', async () => {
  const response = await request(app)
    .delete(`/admin/product/${webProductOne._id}`)
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .expect(200)
})

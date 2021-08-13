// 測試後臺管理APP商品類別

const request = require('supertest')
const app = require('../../app')
const WebCategories = require('../../models/web/webCategoriesModel')

const {
  setupDatabase,
  webCategoryOne,
  adminUserOne
} = require('../fixtures/db')

beforeEach(setupDatabase)

test('Should create category with correct admin', async () => {
  const newCategory = {
    category: '查',
    isEnable: true
  }

  const response = await request(app)
    .post('/admin/categories')
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .send(newCategory)
    .expect(201)

  const category = await WebCategories.findById(response.body._id)
  expect(category).not.toBeNull()
  expect(category.category).toBe(newCategory.category)
  expect(category.count).toBe(0)
})

test('Should not create category with error admin', async () => {
  const newCategory = {
    category: '查',
    isEnable: true
  }

  const response = await request(app)
    .post('/admin/categories')
    .set('Authorization', 'Bearer azxcvza123')
    .send(newCategory)
    .expect(401)
})

test('Should get category lists with correct admin', async () => {
  const response = await request(app)
    .get('/web/categories')
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .expect(200)

  expect(response.body.length).toBe(1)
  expect(response.body[0].category).toBe(webCategoryOne.category)
})

test('Should update web category information with correct admin', async () => {
  const response = await request(app)
    .patch(`/admin/categories/${webCategoryOne._id}`)
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .send({ category: '改過' })
    .expect(200)

  const category = await WebCategories.findById(response.body._id)
  expect(category.category).toBe('改過')
})

test('Should delete category with correct admin', async () => {
  const response = await request(app)
    .delete(`/admin/categories/${webCategoryOne._id}`)
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .expect(200)

  const category = await WebCategories.findById(response.body._id)
  expect(category).toBeNull()
})

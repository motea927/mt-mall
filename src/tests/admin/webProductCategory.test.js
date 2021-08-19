const request = require('supertest')
const app = require('../../app')
const CategoryModel = require('../../models/web/webCategoriesModel')

const {
  setupDatabase,
  adminUserOne,
  webCategoryOneId,
  webCategoryTwoId
} = require('../fixtures/db')

beforeEach(setupDatabase)

// create
test('Should create product category with correct Admin', async () => {
  const newCategory = {
    category: '類別',
    isEnable: true
  }

  const response = await request(app)
    .post('/admin/categories')
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .send(newCategory)
    .expect(201)

  const createdCategory = await CategoryModel.findById(response.body._id)
  expect(createdCategory.category).toBe(newCategory.category)
})

test('Should Not create product category with wrong Admin', async () => {
  const newCategory = {
    category: '類別',
    isEnable: true
  }

  const response = await request(app)
    .post('/admin/categories')
    .set('Authorization', `Bearer 1234`)
    .send(newCategory)
    .expect(401)
})

test('Should not create product category when missing field', async () => {
  const newCategory = {}

  const response = await request(app)
    .post('/admin/categories')
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .send(newCategory)
    .expect(400)
})

// read product category
test('Should get product category when missing field', async () => {
  const response = await request(app).get('/admin/categories').expect(200)
})

// update
test('Should update product category', async () => {
  const newTitle = 'gg'
  const response = await request(app)
    .patch(`/admin/categories/${webCategoryOneId}`)
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .send({ category: newTitle })
    .expect(200)

  const updatedCategory = await CategoryModel.findById(webCategoryOneId)
  expect(updatedCategory.category).toBe(newTitle)
})

// delete
test('Should delete product category', async () => {
  const response = await request(app)
    .delete(`/admin/categories/${webCategoryTwoId}`)
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .send({})
    .expect(200)

  const updatedCategory = await CategoryModel.findById(webCategoryTwoId)
  expect(updatedCategory).toBeNull()
})

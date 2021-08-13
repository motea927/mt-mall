// 測試後臺管理APP會員功能

const request = require('supertest')
const app = require('../../app')
const WebUser = require('../../models/web/webUserModel')

const { setupDatabase, webUserOne, adminUserOne } = require('../fixtures/db')

beforeEach(setupDatabase)

test('Should get web user lists with correct admin', async () => {
  const response = await request(app)
    .get('/admin/user')
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .expect(200)

  expect(response.body.length).toBe(1)
})

test('Should update web user information with correct admin', async () => {
  const response = await request(app)
    .patch(`/admin/user/${webUserOne._id}`)
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .send({ name: '改過' })
    .expect(200)

  const user = await WebUser.findById(response.body._id)
  expect(user.name).toBe('改過')
})

test('Should delete web user with correct admin', async () => {
  const response = await request(app)
    .delete(`/admin/user/${webUserOne._id}`)
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .expect(200)

  const user = await WebUser.findById(response.body._id)
  expect(user).toBeNull()
})

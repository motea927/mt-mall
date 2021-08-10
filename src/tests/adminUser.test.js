const request = require('supertest')
const app = require('../app')
const AdminUser = require('../models/admin/adminUserModel')

const { setupDatabase, adminUserOne, adminUserOneId } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should login existing user', async () => {
  const response = await request(app)
    .post('/admin/user/login')
    .send({ account: adminUserOne.account, password: adminUserOne.password })
    .expect(200)
  const user = await AdminUser.findById(response.body._id)
  expect(user.token).toBe(response.body.token)
})

test('Should not login with nonexistent user', async () => {
  await request(app)
    .post('/admin/user/login')
    .send({ account: 'asdfasdf', password: 'asdfz12' })
    .expect(404)
})

test('Should remove token after logout', async () => {
  const response = await request(app)
    .post('/admin/user/logout')
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .expect(200)

  const user = await AdminUser.findById(adminUserOne._id)
  expect(user.token).toBe('')
})

test('Should create admin user', async () => {
  const newUser = {
    name: '抹綠測試機',
    account: 'test1234567',
    password: 'test1234'
  }

  const response = await request(app)
    .post('/admin/user')
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .send(newUser)
    .expect(201)

  const user = await AdminUser.findById(response.body._id)
  expect(user).not.toBeNull()
  expect(user.name).toBe(newUser.name)
})

test('Should not create admin user with exist user', async () => {
  const response = await request(app)
    .post('/admin/user')
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .send(adminUserOne)
    .expect(400)
})

test('Should get user lists', async () => {
  const response = await request(app)
    .get('/admin/user')
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .expect(200)

  expect(response.body.length).toBe(1)
})

test('Should not get user lists with error token', async () => {
  const response = await request(app)
    .get('/admin/user')
    .set('Authorization', `Bearer  `)
    .expect(401)
})

test('Should update user information', async () => {
  const response = await request(app)
    .patch(`/admin/user/${adminUserOne._id}`)
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .send({ name: '改過' })
    .expect(200)

  const user = await AdminUser.findById(response.body._id)
  expect(user.name).toBe('改過')
})

test('Should not update user information with invalid field', async () => {
  const response = await request(app)
    .patch(`/admin/user/${adminUserOne._id}`)
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .send({ account: '改過' })
    .expect(400)
})

test('Should delete user', async () => {
  const response = await request(app)
    .delete('/admin/user')
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .expect(200)

  const user = await AdminUser.findById(response.body._id)
  expect(user).toBeNull()
})

test('Should not delete user with error token', async () => {
  const response = await request(app)
    .delete('/admin/user')
    .set('Authorization', `Bearer asdfasdf`)
    .expect(401)
})

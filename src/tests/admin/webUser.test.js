const request = require('supertest')
const app = require('../../app')
const UserModel = require('../../models/web/webUserModel')

const { setupDatabase, adminUserOne, webUserOne } = require('../fixtures/db')

beforeEach(setupDatabase)

// Admin CRUD APP User

test('Should Create User', async () => {
  const newUser = {
    name: 'user name',
    email: 'gggg@gggg.com',
    password: 'gggg123'
  }

  const response = await request(app)
    .post('/admin/user')
    .send(newUser)
    .expect(201)

  const createdUser = await UserModel.findById(response.body._id)
  expect(createdUser.name).toBe(newUser.name)
  // hash password
  expect(createdUser.password).not.toBe(newUser.password)
})

test('Should Create User when password"s length < 6', async () => {
  const newUser = {
    name: 'user name',
    email: 'gggg@gggg.com',
    password: 'gggg1'
  }

  const response = await request(app)
    .post('/admin/user')
    .send(newUser)
    .expect(400)
})

test('Should Not Create User with empty field', async () => {
  const newUser = {
    name: '',
    email: 'gggg@gggg.com',
    password: 'gggg11234'
  }

  const response = await request(app)
    .post('/admin/user')
    .send(newUser)
    .expect(400)
})

// read
test('Should get user lists with correct admin', async () => {
  const response = await await request(app)
    .get('/admin/user')
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .send()
    .expect(200)
  expect(response.body.length).not.toBe(0)
})

test('Should not get user lists with error admin', async () => {
  await await request(app)
    .get('/admin/user')
    .set('Authorization', `Bearer token123`)
    .send()
    .expect(401)
})

// update
test('Should update user name with correct admin', async () => {
  const newName = 'newName'
  const response = await request(app)
    .patch(`/admin/user/${webUserOne._id}`)
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .send({ name: newName })
    .expect(200)

  const updatedWebUser = await UserModel.findById(webUserOne._id)
  expect(updatedWebUser.name).toBe(newName)
})

test('Should not update user name with error admin', async () => {
  const newName = 'newName'
  const response = await request(app)
    .patch(`/admin/user/${webUserOne._id}`)
    .set('Authorization', `Bearer token123`)
    .send({ name: newName })
    .expect(401)
})

// delete
test('Should delete user with correct admin', async () => {
  const response = await request(app)
    .delete(`/admin/user/${webUserOne._id}`)
    .set('Authorization', `Bearer ${adminUserOne.token}`)
    .send()
    .expect(200)

  const deletedWebUser = await UserModel.findById(webUserOne._id)
  expect(deletedWebUser).toBeNull()
})

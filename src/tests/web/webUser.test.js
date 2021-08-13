const request = require('supertest')
const app = require('../../app')
const WebUser = require('../../models/web/webUserModel')

const { setupDatabase, webUserOne } = require('../fixtures/db')

beforeEach(setupDatabase)

test('Should create user', async () => {
  const newUser = {
    name: '客戶1',
    email: 'asdfz@gmail.com',
    password: 'test1234'
  }

  const response = await request(app)
    .post('/web/user')
    .send(newUser)
    .expect(201)

  const user = await WebUser.findById(response.body._id)
  expect(user).not.toBeNull()
  expect(user.name).toBe(newUser.name)
})

test('Should not create user with exist email', async () => {
  const newUser = {
    name: '客戶1',
    email: webUserOne.email,
    password: 'test1234'
  }

  const response = await request(app)
    .post('/web/user')
    .send(newUser)
    .expect(400)
})

test('Should not create user with invalid email', async () => {
  const newUser = {
    name: '客戶1',
    email: 'asdfsadf',
    password: 'test1234'
  }

  const response = await request(app)
    .post('/web/user')
    .send(newUser)
    .expect(400)
})

test('Should not create user with <6 password', async () => {
  const newUser = {
    name: '客戶1',
    email: 'asdfsadf',
    password: 'as'
  }

  const response = await request(app)
    .post('/web/user')
    .send(newUser)
    .expect(400)
})

test('Should login with exist user', async () => {
  const response = await request(app)
    .post('/web/user/login')
    .send(webUserOne)
    .expect(200)
})

test('Should not login with error password', async () => {
  const response = await request(app)
    .post('/web/user/login')
    .send({ ...webUserOne, password: 'gggg' })
    .expect(404)
})

test('Should logout with already login user', async () => {
  const response = await request(app)
    .post('/web/user/logout')
    .set('Authorization', `Bearer ${webUserOne.token}`)
    .expect(200)

  const user = await WebUser.findById(webUserOne._id)
  expect(user.token).toBe('')
})

const request = require('supertest')
const app = require('../../app')
const WebOrder = require('../../models/web/webOrderModel')
const WebProductModel = require('../../models/web/webProductModel')

const {
  setupDatabase,
  webUserOneId,
  webProductOne,
  webUserOne
} = require('../fixtures/db')

beforeEach(setupDatabase)

test('Should create order with correct web user', async () => {
  const newOrder = {
    userId: webUserOneId,
    lastName: '李',
    firstName: '測試',
    phone: '0912345678',
    address: '新北市測試區',
    cardLastName: 'LI',
    cardFirstName: 'gg',
    cardExpMonth: '12',
    cardExpYear: '24',
    cardCvc: '123',
    cardNo: '4000221111111111',
    cart: [
      {
        id: webProductOne._id,
        title: webProductOne.title,
        count: 2
      }
    ],
    totalPrice: webProductOne.price * 2,
    date: '2021-08-15'
  }

  const response = await request(app)
    .post('/web/order')
    .set('Authorization', `Bearer ${webUserOne.token}`)
    .send(newOrder)
    .expect(201)

  const order = await WebOrder.findById(response.body._id)
  expect(order).not.toBeNull()
  expect(order.cardNo).toBe(newOrder.cardNo)
})

test('Should not create order with error totalPrice', async () => {
  const newOrder = {
    userId: webUserOneId,
    lastName: '李',
    firstName: '測試',
    phone: '0912345678',
    address: '新北市測試區',
    cardLastName: 'LI',
    cardFirstName: 'gg',
    cardExpMonth: '12',
    cardExpYear: '24',
    cardCvc: '123',
    cardNo: '4000221111111111',
    cart: [
      {
        id: webProductOne._id,
        title: webProductOne.title,
        count: 2
      }
    ],
    totalPrice: 9999,
    date: '2021-08-15'
  }

  const response = await request(app)
    .post('/web/order')
    .set('Authorization', `Bearer ${webUserOne.token}`)
    .send(newOrder)
    .expect(400)
})

test('Should add product sales after success', async () => {
  const newOrder = {
    userId: webUserOneId,
    lastName: '李',
    firstName: '測試',
    phone: '0912345678',
    address: '新北市測試區',
    cardLastName: 'LI',
    cardFirstName: 'gg',
    cardExpMonth: '12',
    cardExpYear: '24',
    cardCvc: '123',
    cardNo: '4000221111111111',
    cart: [
      {
        id: webProductOne._id,
        title: webProductOne.title,
        count: 2
      }
    ],
    totalPrice: webProductOne.price * 2,
    date: '2021-08-15'
  }

  const response = await request(app)
    .post('/web/order')
    .set('Authorization', `Bearer ${webUserOne.token}`)
    .send(newOrder)
    .expect(201)

  const product = await WebProductModel.findById(webProductOne._id)
  expect(product.sales).toBe(2)
})

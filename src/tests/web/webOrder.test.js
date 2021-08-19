const request = require('supertest')
const app = require('../../app')

const {
  setupDatabase,
  webProductOne,
  webProductTwo,
  webUserOneId,
  webUserOne
} = require('../fixtures/db')

beforeEach(setupDatabase)

// WEB APP CR
test('Should create new order', async () => {
  const cart = [
    { ...webProductOne, count: 1 },
    { ...webProductTwo, count: 1 }
  ]
  const order = {
    cart,
    userId: webUserOneId,
    purchaseInformation: {
      address: '地址測試',
      cardCvc: '123',
      cardExpMonth: '12',
      cardExpYear: '24',
      cardLastName: 'Li',
      cardFirstName: 'Morty',
      cardNo: '4000221111111111',
      firstName: 'Li',
      lastName: 'Morty',
      phone: '0912345678'
    },
    totalPrice: webProductOne.price + webProductTwo.price
  }

  const response = await request(app)
    .post('/web/order')
    .set('Authorization', `Bearer ${webUserOne.token}`)
    .send(order)
    .expect(201)
})

test('Should Not create order with non login', async () => {
  const cart = [
    { ...webProductOne, count: 1 },
    { ...webProductTwo, count: 1 }
  ]
  const order = {
    cart,
    userId: webUserOneId,
    purchaseInformation: {
      address: '地址測試',
      cardCvc: '123',
      cardExpMonth: '12',
      cardExpYear: '24',
      cardLastName: 'Li',
      cardFirstName: 'Morty',
      cardNo: '4000221111111111',
      firstName: 'Li',
      lastName: 'Morty',
      phone: '0912345678'
    },
    totalPrice: webProductOne.price + webProductTwo.price
  }

  const response = await request(app)
    .post('/web/order')
    .set('Authorization', `Bearer 12312`)
    .send(order)
    .expect(401)
})

test('Should Not create order with error total price', async () => {
  const cart = [
    { ...webProductOne, count: 1 },
    { ...webProductTwo, count: 1 }
  ]
  const order = {
    cart,
    userId: webUserOneId,
    purchaseInformation: {
      address: '地址測試',
      cardCvc: '123',
      cardExpMonth: '12',
      cardExpYear: '24',
      cardLastName: 'Li',
      cardFirstName: 'Morty',
      cardNo: '4000221111111111',
      firstName: 'Li',
      lastName: 'Morty',
      phone: '0912345678'
    },
    totalPrice: webProductOne.price + webProductTwo.price + 22
  }

  const response = await request(app)
    .post('/web/order')
    .set('Authorization', `Bearer ${webUserOne.token}`)
    .send(order)
    .expect(400)
})

test('Should not create order with error cardNo', async () => {
  const cart = [
    { ...webProductOne, count: 1 },
    { ...webProductTwo, count: 1 }
  ]
  const order = {
    cart,
    userId: webUserOneId,
    purchaseInformation: {
      address: '地址測試',
      cardCvc: '123',
      cardExpMonth: '12',
      cardExpYear: '24',
      cardLastName: 'Li',
      cardFirstName: 'Morty',
      cardNo: '1234567890111234',
      firstName: 'Li',
      lastName: 'Morty',
      phone: '0912345678'
    },
    totalPrice: webProductOne.price + webProductTwo.price
  }

  const response = await request(app)
    .post('/web/order')
    .set('Authorization', `Bearer ${webUserOne.token}`)
    .send(order)
    .expect(400)
})

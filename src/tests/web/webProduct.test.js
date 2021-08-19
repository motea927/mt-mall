const request = require('supertest')
const app = require('../../app')

const { setupDatabase } = require('../fixtures/db')

beforeEach(setupDatabase)

// WEB APP 只有讀
test('Should get product lists', async () => {
  const response = await request(app).get('/web/product').expect(200)
  expect(response.body.length).toBe(2)
})

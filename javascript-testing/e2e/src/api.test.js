const { describe, it } = require('mocha')
const request = require('supertest')
const app = require('./api')
const assert = require('assert')

describe('API suit test', () => {
  describe('/contact', () => {
    it ('should request the contact page and return HTTP Status 200', async () => {
      const response = await request(app)
        .get('/contact')
        .expect(200)

      assert.deepStrictEqual(response.text, 'Contact us page!')
    })
  })

  describe('/invalid', () => {
    it ('should request an inexistent route redirect to not fount', async () => {
      const response = await request(app)
        .get('/invalid')
        .expect(200)

      assert.deepStrictEqual(response.text, 'Not found!')
    })
  })

  describe('/login', () => {
    it ('should login successfully on the login route and return HTTP Status 200', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'Gustavo', password: 'pass' })
        .expect(200)

      assert.deepStrictEqual(response.text, 'Login has succeeded!')
    })

    it ('should not login with wrong data and return HTTP Status 401', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'invalid', password: 'pass' })
        .expect(401)

      assert.ok(response.unauthorized)
      assert.deepStrictEqual(response.text, 'Invalid credentials!')
    })
  })
})


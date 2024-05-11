const { describe, it, after, before } = require('mocha')
const supertest = require('supertest')
const assert = require('node:assert')


describe('API Suite Test', () => {
  let app;
  
  before((done) => {
    app = require('./api')
    app.once('listening', done)
  })

  after((done) => app.close(done))

  describe('/contact', () => {
    it('should request the contact page and return HTTP Status 200', async () => {
      const response = await supertest(app)
        .get('/contact')
        .expect(200)

      assert.strictEqual(response.text, 'Contact us page')
    })

    it('should request the default page and return HTTP Status 404', async () => {
      const response = await supertest(app)
        .get('/default')
        .expect(404)

      assert.strictEqual(response.text, 'Page not found')
    })

    it('should request the login page and return HTTP Status 401', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ name: 'Gustavo', password: '123456' })
        .expect(401)

      assert.strictEqual(response.text, 'Loggin failed!')
    })

    it('should request the login page and return HTTP Status 200', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ name: 'Gustavo', password: '123456Ab' })
        .expect(200)

      assert.strictEqual(response.text,'Login succeeded')
    })
  })
})
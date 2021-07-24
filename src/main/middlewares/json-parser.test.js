const request = require('supertest')
const app = require('../config/app')

describe('JSON Parser Middleware', () => {
  it('Should return Content-Type JSON if JSON Parser Middleware enable', async () => {
    app.post('/test_json_parser', (req, res) => {
      res.status(201).send(req.body)
    })

    await request(app)
      .post('/test_json_parser')
      .send({ name: 'Mango' })
      .expect('Content-Type', /application\/json/)
      .expect({ name: 'Mango' })
      .expect(201)
  })
})

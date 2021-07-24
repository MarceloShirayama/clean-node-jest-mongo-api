const request = require('supertest')
const app = require('../config/app')

describe('Content-Type Middleware', () => {
  it('should return json content-type as default if Content-Type Middleware enable', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send('')
    })
    await request(app).get('/test_content_type')
      .expect('Content-Type', /application\/json/)
  })

  it('should return xml content-type if forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.send('')
    })
    await request(app).get('/test_content_type_xml')
      .expect('Content-Type', /application\/xml/)
  })
})

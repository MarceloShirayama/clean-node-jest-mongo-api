const request = require('supertest')
const app = require('../config/app')

describe('Headers Middlewares', () => {
  it('should allow full access to the headers if you set up full access', async () => {
    app.get('/test_cors', (req, res) => {
      res.send('')
    })
    const response = await request(app).get('/test_cors')
    expect(response.headers['access-control-allow-origin']).toBe('*')
    expect(response.headers['access-control-allow-methods']).toBe('*')
    expect(response.headers['access-control-allow-headers']).toBe('*')
  })
})

const request = require('supertest')
const app = require('./app')

describe('App Setup', () => {
  it('Should X-Powered-By: Express returns undefined if x-powered-by is disabled ', async () => {
    app.get('/test_x_powered_by', (req, res) => {
      res.send('')
    })
    const response = await request(app).get('/test_x_powered_by')
    console.log(response.headers)
    expect(response.headers['x-powered-by']).toBeUndefined()
  })

  it('should allow full access to the headers if you set up full access', async () => {
    app.get('/test_cors', (req, res) => {
      res.send('')
    })
    const response = await request(app).get('/test_cors')
    console.log(response.headers)
    expect(response.headers['access-control-allow-origin']).toBe('*')
    expect(response.headers['access-control-allow-methods']).toBe('*')
    expect(response.headers['access-control-allow-headers']).toBe('*')
  })
})

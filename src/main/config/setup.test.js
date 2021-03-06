const request = require('supertest')
const app = require('./app')

describe('App Setup', () => {
  it('Should X-Powered-By: Express returns undefined if x-powered-by is disabled ', async () => {
    app.get('/test_x_powered_by', (req, res) => {
      res.send('')
    })
    const response = await request(app).get('/test_x_powered_by')
    expect(response.headers['x-powered-by']).toBeUndefined()
  })
})

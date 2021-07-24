const headers = require('../middlewares/headers')

module.exports = app => {
  app.disable('x-powered-by')
  app.use(headers)
}

const headers = require('../middlewares/headers')
const jsonParser = require('../middlewares/json-parser')

module.exports = app => {
  app.disable('x-powered-by')
  app.use(headers)
  app.use(jsonParser)
}

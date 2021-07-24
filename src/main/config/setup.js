const headers = require('../middlewares/headers')
const jsonParser = require('../middlewares/json-parser')
const contentType = require('../middlewares/content-type')

module.exports = app => {
  app.disable('x-powered-by')
  app.use(headers)
  app.use(jsonParser)
  app.use(contentType)
}

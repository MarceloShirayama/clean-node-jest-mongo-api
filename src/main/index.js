const MongoHelper = require('../infra/helpers/mongo-helper')
const env = require('./config/env')

MongoHelper.connect(env.mongoUrl)
  .then(() => {
    const app = require('./config/app')
    const { serverPort, serverHost } = env
    app.listen(serverPort, serverHost, () => (
      console.log(`listen on: http://${serverHost}:${serverPort}`
      )))
  })
  .catch(console.error)

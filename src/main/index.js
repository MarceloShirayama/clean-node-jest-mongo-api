const MongoHelper = require('../infra/helpers/mongo-helper')
const env = require('./config/env')

MongoHelper.connect(env.mongoUrl)
  .then(() => {
    const app = require('./config/app')
    const { port, host } = env
    app.listen(port, host, () => console.log(`listen on: http://${host}:${port}`))
  })
  .catch(console.error)

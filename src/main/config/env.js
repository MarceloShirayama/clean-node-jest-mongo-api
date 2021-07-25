require('dotenv').config()

const mongoHost = process.env.MONGO_HOST
const mongoPort = process.env.MONGO_PORT
const mongoDb = process.env.MONGO_DB
const mongoUser = process.env.MONGO_USER
const mongoPass = process.env.MONGO_PASS
const mongoUrl = `mongodb://${mongoUser}:${mongoPass}@${mongoHost}:${mongoPort}/${mongoDb}`
const tokenSecret = process.env.TOKEN_SECRET || 'secret_key'
const serverPort = process.env.SERVER_PORT || 5858
const serverHost = process.env.SERVER_HOST || 'localhost'

module.exports = {
  mongoUrl,
  tokenSecret,
  serverPort,
  serverHost
}

module.exports = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://clean-node-api-user:clean-node-api-pass@localhost:27017/clean-node-api',
  tokenSecret: process.env.TOKEN_SECRET || 'secret_key',
  port: process.env.PORT || 5858,
  host: process.env.HOST || 'localhost'
}

module.exports = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://clean-node-api-user:clean-node-api-pass@localhost:27017/clean-node-api',
  tokenSecret: process.env.TOKEN_SECRET || 'secret_key'
}

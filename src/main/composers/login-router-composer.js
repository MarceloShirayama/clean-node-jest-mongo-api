const LoginRouter = require('../../presentation/routers/login-router')
const AuthUseCase = require('../../domain/usecases/auth-usecase')
const EmailValidator = require('../../utils/helpers/email-validator')
const Encrypter = require('../../utils/helpers/encrypter')
const TokenGenerator = require('../../utils/helpers/token-generator')
const LoadUserByEmailRepository = require('../../infra/repositories/load-user-by-email-repository')
const UpdateAccessTokenRepository = require('../../infra/repositories/update-access-token-repository')
const env = require('../config/env')

module.exports = class LoginRouterComposer {
  static compose () {
    const updateAccessTokenRepository = new UpdateAccessTokenRepository()
    const tokenGenerator = new TokenGenerator(env.tokenSecret)
    const encrypter = new Encrypter()
    const loadUserByEmailRepository = new LoadUserByEmailRepository()
    const emailValidator = new EmailValidator()
    const authUseCase = new AuthUseCase({
      loadUserByEmailRepository,
      encrypter,
      tokenGenerator,
      updateAccessTokenRepository
    })

    return new LoginRouter({ authUseCase, emailValidator })
  }
}

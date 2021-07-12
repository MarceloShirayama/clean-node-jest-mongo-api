const HttpResponse = require('../helper/http-response')
const MissingParamError = require('../helper/missing-param-error')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'))
      }
      if (!password) {
        return HttpResponse.badRequest(new MissingParamError('password'))
      }
      const accessToken = await this.authUseCase.auth(email, password)
      if (!accessToken) {
        return HttpResponse.UnauthorizedError()
      }
      return HttpResponse.ok({ accessToken })
    } catch (error) {
      console.error(error)
      return HttpResponse.serverError()
    }
  }
}


// const express = require('express')
// const router = express.Router()

// export routes
module.exports = () => {
  const router = new SignupRouter()
  router.post('/signup', ExpressRouterAdapter().adapter(router))
}

// express-router-adapter
class ExpressRouterAdapter {
  static adapter (router) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body
      }
      const httpResponse = await router.route(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}

// presentation layer
// signup-router
class SignupRouter {
  async route (httpRequest) {
    const { email, password, repeatPassword } = httpRequest.body
    const user = new SignupUseCase().signup(email, password, repeatPassword)
    if (!user) {
      httpRequest.status(400).json({ error: 'password must be equal to repeatPassword' })
    }
    return {
      statusCode: 200,
      body: user
    }
  }
}

// domain
// signup-usecase
class SignupUseCase {
  async signup (email, password, repeatPassword) {
    if (password === repeatPassword) {
      new AddAccountRepository().add(email, password)
    }
  }
}

// infra layer
// add-account-repositoy
const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')
class AddAccountRepository {
  async add (email, password) {
    const user = await AccountModel.create({ email, password })
    return user
  }
}

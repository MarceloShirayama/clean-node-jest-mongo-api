// export routes
module.exports = () => {
  router.post('/signup', new SignupRouter().route)
}

// signup-router
const express = require('express')
const router = express.Router()
class SignupRouter {
  async route (req, res) {
    const { email, password, repeatPassword } = req.body
    const user = new SignupUseCase().signup(email, password, repeatPassword)
    if (!user) {
      res.status(400).json({ error: 'password must be equal to repeatPassword' })
    }
    res.status(200).json({ message: 'User created successfully' })
  }
}

// signup-usecase
class SignupUseCase {
  async signup (email, password, repeatPassword) {
    if (password === repeatPassword) {
      new AddAccountRepository().add(email, password)
    }
  }
}

const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')
class AddAccountRepository {
  async add (email, password) {
    const user = await AccountModel.create({ email, password })
    return user
  }
}

const MongoHelper = require('../helpers/mongo-helper')
const UpdateAccessTokenRepository = require('./update-access-token-repository')
const MissingParamError = require('../../utils/errors/missing-param-error')

let db

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new UpdateAccessTokenRepository(userModel)
  return {
    sut,
    userModel
  }
}

describe('Update Access Token Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    db = await MongoHelper.getDb()
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('Should update the user with the given accessToken', async () => {
    const { sut, userModel } = makeSut()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })
    const { _id } = fakeUser.ops[0]
    await sut.update(_id, 'valid_token')
    const updatedFakeUser = await userModel.findOne({ _id })
    expect(updatedFakeUser.accessToken).toBe('valid_token')
  })

  it('Should throw error if userModel is not provided', async () => {
    const sut = new UpdateAccessTokenRepository()
    const userModel = db.collection('users')
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })
    const { _id } = fakeUser.ops[0]
    const promise = sut.update(_id, 'valid_token')
    expect(promise).rejects.toThrow()
  })

  it('Should throw error if params are not provided', async () => {
    const { sut, userModel } = makeSut()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })
    const { _id } = fakeUser.ops[0]
    expect(sut.update()).rejects.toThrow(new MissingParamError('userId'))
    expect(sut.update(_id)).rejects.toThrow(new MissingParamError('accessToken'))
  })
})

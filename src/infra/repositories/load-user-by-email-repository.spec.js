class LoadUserByEmailRepository {
  async load (email) {
    return null
  }
}

describe('Load User by Email Repository', () => {
  it('Should return null if user is not found', async () => {
    const sut = new LoadUserByEmailRepository()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })
})

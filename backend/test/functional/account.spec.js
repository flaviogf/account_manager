'use strict'

const { test, trait } = use('Test/Suite')('Account')

const Account = use('App/Models/Account')
const User = use('App/Models/User')

const chance = require('chance').Chance()

trait('DatabaseTransactions')
trait('Test/ApiClient')
trait('Auth/Client')

test('store -> should return status 201 when account is created', async ({
  client
}) => {
  const user = await User.create({
    name: chance.name(),
    email: chance.email(),
    username: chance.name(),
    password: chance.word()
  })

  const data = {
    name: chance.name(),
    login: chance.name(),
    password: chance.word()
  }

  const response = await client
    .post('/account')
    .loginVia(user)
    .send(data)
    .end()

  response.assertStatus(201)
})

test('store -> should return status 401 when user not is informed', async ({
  client
}) => {
  const data = {
    name: chance.name(),
    login: chance.name(),
    password: chance.word()
  }

  const response = await client
    .post('/account')
    .send(data)
    .end()

  response.assertStatus(401)
})

test('store -> should update database when account is created', async ({
  assert,
  client
}) => {
  const user = await User.create({
    name: chance.name(),
    email: chance.email(),
    username: chance.name(),
    password: chance.word()
  })

  const data = {
    name: chance.name(),
    login: chance.name(),
    password: chance.word()
  }

  await client
    .post('/account')
    .loginVia(user)
    .send(data)
    .end()

  const count = await Account.getCount()

  assert.equal(count, 1)
})

test('store -> should return status 400 when request is invalid', async ({
  client
}) => {
  const user = await User.create({
    name: chance.name(),
    email: chance.email(),
    username: chance.name(),
    password: chance.word()
  })

  const data = {
    name: '',
    login: chance.name(),
    password: chance.word()
  }

  const response = await client
    .post('/account')
    .loginVia(user)
    .send(data)
    .end()

  response.assertStatus(400)
})

test('index -> should return status 200', async ({ client }) => {
  const user = await User.create({
    name: chance.name(),
    email: chance.email(),
    username: chance.name(),
    password: chance.word()
  })

  const account = new Account()

  account.fill({
    name: chance.name(),
    login: chance.email(),
    password: chance.word()
  })

  await user.accounts().save(account)

  const response = await client
    .get('/account')
    .loginVia(user)
    .send()
    .end()

  response.assertStatus(200)
})

test('index -> should return a list of account', async ({ assert, client }) => {
  const user = await User.create({
    name: chance.name(),
    email: chance.email(),
    username: chance.name(),
    password: chance.word()
  })

  const account = new Account()

  account.fill({
    name: chance.name(),
    login: chance.email(),
    password: chance.word()
  })

  await user.accounts().save(account)

  const response = await client
    .get('/account?page=1&perPage=2')
    .loginVia(user)
    .send()
    .end()

  assert.lengthOf(response.body.data, 1)
  assert.equal(response.body.page, 1)
  assert.equal(response.body.perPage, 2)
})

test('show -> should return status 200 when account exist', async ({
  client
}) => {
  const user = await User.create({
    name: chance.name(),
    email: chance.email(),
    username: chance.name(),
    password: chance.word()
  })

  const account = new Account()

  account.fill({
    name: chance.name(),
    login: chance.email(),
    password: chance.word()
  })

  await user.accounts().save(account)

  const response = await client
    .get(`/account/${account.id}`)
    .loginVia(user)
    .send()
    .end()

  response.assertStatus(200)
})

test('show -> should return account when account exist', async ({
  assert,
  client
}) => {
  const user = await User.create({
    name: chance.name(),
    email: chance.email(),
    username: chance.name(),
    password: chance.word()
  })

  const account = new Account()

  account.fill({
    name: chance.name(),
    login: chance.email(),
    password: chance.word()
  })

  await user.accounts().save(account)

  const response = await client
    .get(`/account/${account.id}`)
    .loginVia(user)
    .send()
    .end()

  const { data } = response.body

  assert.equal(data.name, account.name)
  assert.equal(data.login, account.login)
  assert.equal(data.password, account.password)
})

test('show -> should return status 404 when account not exist', async ({
  client
}) => {
  const user = await User.create({
    name: chance.name(),
    email: chance.email(),
    username: chance.name(),
    password: chance.word()
  })

  const response = await client
    .get(`/account/xxx`)
    .loginVia(user)
    .send()
    .end()

  response.assertStatus(404)
})

test('update -> should return status 200 when account is updated', async ({
  client
}) => {
  const user = await User.create({
    name: chance.name(),
    email: chance.email(),
    username: chance.name(),
    password: chance.word()
  })

  const account = new Account()

  account.fill({
    name: chance.name(),
    login: chance.email(),
    password: chance.word()
  })

  await user.accounts().save(account)

  const data = {
    name: chance.name(),
    login: chance.email(),
    password: chance.word()
  }

  const response = await client
    .put(`/account/${account.id}`)
    .loginVia(user)
    .send(data)
    .end()

  response.assertStatus(200)
})

test('update -> should update database when account is updated', async ({
  assert,
  client
}) => {
  const user = await User.create({
    name: chance.name(),
    email: chance.email(),
    username: chance.name(),
    password: chance.word()
  })

  const account = new Account()

  account.fill({
    name: chance.name(),
    login: chance.email(),
    password: chance.word()
  })

  await user.accounts().save(account)

  const data = {
    name: chance.name(),
    login: chance.email(),
    password: chance.word()
  }

  await client
    .put(`/account/${account.id}`)
    .loginVia(user)
    .send(data)
    .end()

  await account.reload()

  assert.equal(account.name, data.name)
  assert.equal(account.login, data.login)
  assert.equal(account.password, data.password)
})

test('update -> should return status 404 when account not is exist', async ({
  client
}) => {
  const user = await User.create({
    name: chance.name(),
    email: chance.email(),
    username: chance.name(),
    password: chance.word()
  })

  const data = {
    name: chance.name(),
    login: chance.email(),
    password: chance.word()
  }

  const response = await client
    .put(`/account/xxx`)
    .loginVia(user)
    .send(data)
    .end()

  response.assertStatus(404)
})

test('update -> should return status 400 when request is invalid', async ({
  client
}) => {
  const user = await User.create({
    name: chance.name(),
    email: chance.email(),
    username: chance.name(),
    password: chance.word()
  })

  const account = new Account()

  account.fill({
    name: chance.name(),
    login: chance.email(),
    password: chance.word()
  })

  await user.accounts().save(account)

  const data = {
    name: '',
    login: chance.email(),
    password: chance.word()
  }

  const response = await client
    .put(`/account/${account.id}`)
    .loginVia(user)
    .send(data)
    .end()

  response.assertStatus(400)
})

test('destroy -> should return status 200 when account is destroyed', async ({
  client
}) => {
  const user = await User.create({
    name: chance.name(),
    email: chance.email(),
    username: chance.name(),
    password: chance.word()
  })

  const account = new Account()

  account.fill({
    name: chance.name(),
    login: chance.email(),
    password: chance.word()
  })

  await user.accounts().save(account)

  const response = await client
    .delete(`/account/${account.id}`)
    .loginVia(user)
    .send()
    .end()

  response.assertStatus(200)
})

test('destroy -> should update database when account is destroyed', async ({
  assert,
  client
}) => {
  const user = await User.create({
    name: chance.name(),
    email: chance.email(),
    username: chance.name(),
    password: chance.word()
  })

  const account = new Account()

  account.fill({
    name: chance.name(),
    login: chance.email(),
    password: chance.word()
  })

  await user.accounts().save(account)

  await client
    .delete(`/account/${account.id}`)
    .loginVia(user)
    .send()
    .end()

  const count = await Account.getCount()

  assert.equal(count, 0)
})

test('destroy -> should return status 404 when account not exist', async ({
  client
}) => {
  const user = await User.create({
    name: chance.name(),
    email: chance.email(),
    username: chance.name(),
    password: chance.word()
  })

  const response = await client
    .delete(`/account/xxx`)
    .loginVia(user)
    .send()
    .end()

  response.assertStatus(404)
})

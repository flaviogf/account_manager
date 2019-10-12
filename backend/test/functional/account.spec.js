'use strict'

const { test, trait } = use('Test/Suite')('Account')

const Account = use('App/Models/Account')
const User = use('App/Models/User')

const chance = require('chance').Chance()

trait('DatabaseTransactions')
trait('Test/ApiClient')
trait('Auth/Client')

test('should return status 201 when account is created', async ({ client }) => {
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

test('should return status 401 when user not is informed', async ({
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

test('should update database when account is created', async ({
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

test('should return status 400 when request is invalid', async ({ client }) => {
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

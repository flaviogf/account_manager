'use strict'

const { test, trait } = use('Test/Suite')('Session')

const User = use('App/Models/User')

const chance = require('chance').Chance()

trait('DatabaseTransactions')
trait('Test/ApiClient')

test('store -> should return status 200 when user is authenticated', async ({
  client
}) => {
  const password = chance.word()

  const user = await User.create({
    name: chance.name(),
    email: chance.email(),
    username: chance.name(),
    password
  })

  const data = {
    username: user.username,
    password
  }

  const response = await client
    .post('/session')
    .send(data)
    .end()

  response.assertStatus(200)
})

test('store -> should return a token when user is authenticated', async ({
  assert,
  client
}) => {
  const password = chance.word()

  const user = await User.create({
    name: chance.name(),
    email: chance.email(),
    username: chance.name(),
    password
  })

  const data = {
    username: user.username,
    password
  }

  const response = await client
    .post('/session')
    .send(data)
    .end()

  assert.isOk(response.body.data)
})

test('store -> should return status 401 when user not is authenticated', async ({
  client
}) => {
  const password = chance.word()

  const user = await User.create({
    name: chance.name(),
    email: chance.email(),
    username: chance.name(),
    password
  })

  const data = {
    username: user.username,
    password: 'wrong'
  }

  const response = await client
    .post('/session')
    .send(data)
    .end()

  response.assertStatus(401)
})

'use strict'

const { test, trait } = use('Test/Suite')('User')

const User = use('App/Models/User')

const chance = require('chance').Chance()

trait('DatabaseTransactions')
trait('Test/ApiClient')

test('store -> should return status 201 when user is created', async ({
  client
}) => {
  const data = {
    name: chance.name(),
    email: chance.email(),
    username: chance.name(),
    password: chance.word()
  }

  const response = await client
    .post('/user')
    .send(data)
    .end()

  response.assertStatus(201)
})

test('store -> should update database when user is created', async ({
  assert,
  client
}) => {
  const data = {
    name: chance.name(),
    email: chance.email(),
    username: chance.name(),
    password: chance.word()
  }

  await client
    .post('/user')
    .send(data)
    .end()

  const count = await User.getCount()

  assert.equal(1, count)
})

test('store -> should return status 400 when email already in use', async ({
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
    email: user.email,
    username: chance.name(),
    password: chance.word()
  }

  const response = await client
    .post('/user')
    .send(data)
    .end()

  response.assertStatus(400)
})

test('store -> should return status 400 when username already in use', async ({
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
    email: chance.email(),
    username: user.username,
    password: chance.word()
  }

  const response = await client
    .post('/user')
    .send(data)
    .end()

  response.assertStatus(400)
})

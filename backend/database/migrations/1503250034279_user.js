'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments()
      table.string('name').notNullable()
      table
        .string('email', 255)
        .notNullable()
        .unique()
      table
        .string('username', 255)
        .notNullable()
        .unique()
      table.string('password', 255).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema

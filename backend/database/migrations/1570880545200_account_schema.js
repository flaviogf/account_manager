'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AccountSchema extends Schema {
  up() {
    this.create('accounts', (table) => {
      table.increments()
      table.string('name', 255).notNullable()
      table.string('login', 255).notNullable()
      table.string('password', 255).notNullable()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
      table.timestamps()
    })
  }

  down() {
    this.drop('accounts')
  }
}

module.exports = AccountSchema

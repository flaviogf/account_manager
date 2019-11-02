'use strict'

/*
|--------------------------------------------------------------------------
| InsertUserFlavioSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class InsertUserFlavioSeeder {
  async run() {
    await Factory.model('App/Models/User').create({
      name: 'flavio',
      email: 'flavio@smn.com.br',
      username: 'flaviogf',
      password: 'test'
    })
  }
}

module.exports = InsertUserFlavioSeeder

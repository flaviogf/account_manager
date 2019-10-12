'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('user', 'UserController.store').validator('User/Store')

Route.post('session', 'SessionController.store')

Route.group(() => {
  Route.resource('account', 'AccountController')
    .apiOnly()
    .validator(
      new Map([
        [['account.store'], ['Account/Store']],
        [['account.update'], ['Account/Update']]
      ])
    )
}).middleware(['auth'])

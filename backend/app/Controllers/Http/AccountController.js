'use strict'

const Account = use('App/Models/Account')

class AccountController {
  async store({ request, response, auth }) {
    const { name, login, password } = request.only([
      'name',
      'login',
      'password'
    ])

    const account = new Account()
    account.name = name
    account.login = login
    account.password = password

    const user = await auth.getUser()

    await user.accounts().save(account)

    await account.reload()

    return response.created({ data: account.id, erros: [] })
  }
}

module.exports = AccountController

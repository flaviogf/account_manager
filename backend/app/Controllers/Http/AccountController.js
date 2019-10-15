'use strict'

const Account = use('App/Models/Account')

class AccountController {
  async store({ request, response, auth }) {
    const account = new Account()

    account.fill(request.only(['name', 'login', 'password']))

    const user = await auth.getUser()

    await user.accounts().save(account)

    await account.reload()

    return response.created({ data: account.id, erros: [] })
  }

  async index({ request, response, auth }) {
    const user = await auth.getUser()

    const { page = 1, perPage = 5 } = request.get()

    const paginationOfAccounts = await user
      .accounts()
      .orderBy('created_at', 'desc')
      .paginate(page, perPage)

    return response.ok(paginationOfAccounts)
  }

  async show({ params, response, auth }) {
    const { id } = params

    const user = await auth.getUser()

    const account = await user
      .accounts()
      .where({ id })
      .firstOrFail()

    return response.ok({ data: account, errors: [] })
  }

  async update({ params, request, response, auth }) {
    const { id } = params

    const user = await auth.getUser()

    const account = await user
      .accounts()
      .where({ id })
      .firstOrFail()

    account.merge(request.only(['name', 'login', 'password']))

    await account.save()

    return response.ok({ data: account.id, errors: [] })
  }

  async destroy({ params, response, auth }) {
    const { id } = params

    const user = await auth.getUser()

    const account = await user
      .accounts()
      .where({ id })
      .firstOrFail()

    await account.delete()

    return response.ok({ data: account.id, errors: [] })
  }
}

module.exports = AccountController

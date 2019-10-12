'use strict'

class SessionController {
  async store({ request, response, auth }) {
    const { username, password } = request.only(['username', 'password'])

    const { token } = await auth.attempt(username, password)

    return response.ok({ data: token, errors: [] })
  }
}

module.exports = SessionController

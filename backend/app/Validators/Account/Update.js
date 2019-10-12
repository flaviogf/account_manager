'use strict'

class AccountUpdate {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      name: 'required',
      login: 'required',
      password: 'required'
    }
  }
}

module.exports = AccountUpdate

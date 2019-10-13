import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Container } from './styles'

import Form from './Form'
import List from './List'

import api from '../../services/api'
import session from '../../services/session'

function Accounts() {
  const [name, setName] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    function getToken() {
      return session.getBearerToken()
    }

    function loadAccounts(authorization) {
      return api.get('/account', { headers: { authorization } })
    }

    getToken()
      .then(loadAccounts)
      .then((res) => res.data)
      .then(setAccounts)
      .catch(() => toast.error('Unable to load accounts.'))
  }, [])

  function onSubmit(e) {
    e.preventDefault()

    function getToken() {
      return session.getBearerToken()
    }

    function storeAccount(authorization) {
      const account = { name, login, password }

      return api
        .post('/account', account, { headers: { authorization } })
        .then((res) => res.data)
        .then((id) => [{ ...account, id }, ...accounts])
    }

    getToken()
      .then(storeAccount)
      .then(setAccounts)
      .then(() => setPassword(''))
      .then(() => setLogin(''))
      .then(() => setName(''))
      .then(() => toast.success('Successfully created account'))
      .catch(() => toast.error('Unable to create account.'))
  }

  return (
    <Container>
      <Form
        onSubmit={onSubmit}
        setPassword={setPassword}
        setLogin={setLogin}
        setName={setName}
        password={password}
        login={login}
        name={name}
      />
      <List accounts={accounts} setAccounts={setAccounts} />
    </Container>
  )
}

export default Accounts

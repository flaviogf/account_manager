import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Container } from './styles'

import Form from './Form'
import List from './List'

import api from '../../services/api'
import session from '../../services/session'

function Accounts() {
  const [accountId, setAccountId] = useState(0)
  const [name, setName] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [accounts, setAccounts] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    function getToken() {
      return session.getBearerToken()
    }

    function loadAccounts(authorization) {
      return api.get(`/account?page=${page}`, { headers: { authorization } })
    }

    getToken()
      .then(loadAccounts)
      .then((res) => res.data)
      .then((more) => setAccounts((current) => [...current, ...more]))
      .catch(() => toast.error('Unable to load accounts.'))
  }, [page])

  function onSubmit(e) {
    e.preventDefault()

    function getToken() {
      return session.getBearerToken()
    }

    function storeAccount(authorization) {
      const account = { name, login, password }

      const url = accountId ? `/account/${accountId}` : '/account'

      const method = accountId ? 'put' : 'post'

      return api[method](url, account, { headers: { authorization } })
        .then((res) => res.data)
        .then((id) => ({ id, ...account }))
    }

    function reloadAccounts(account) {
      if (page === 1) {
        setAccounts([
          account,
          ...accounts.filter((it) => it.id !== account.id).splice(0, 4)
        ])
        return
      }

      setAccounts([])
      setPage(1)
    }

    function clearForm() {
      setPassword('')
      setAccountId(0)
      setLogin('')
      setName('')
    }

    getToken()
      .then(storeAccount)
      .then(reloadAccounts)
      .then(clearForm)
      .then(() => toast.success('Operation successfully performed.'))
      .catch(() => toast.error('Unable to perform operation.'))
  }

  function onReset() {
    setPassword('')
    setAccountId(0)
    setLogin('')
    setName('')
  }

  function onEdit(account) {
    setPassword(account.password)
    setAccountId(account.id)
    setLogin(account.login)
    setName(account.name)
  }

  function onConfirmDelete(account) {
    function getToken() {
      return session.getBearerToken()
    }

    function deleteAccount(authorization) {
      return api
        .delete(`/account/${account.id}`, { headers: { authorization } })
        .then((res) => res.data)
        .then(() => accounts.filter((it) => it.id !== account.id))
    }

    getToken()
      .then(deleteAccount)
      .then(setAccounts)
      .then(() => toast.success('Operation successfully performed.'))
      .catch(() => toast.error('Unable to perform operation.'))
  }

  function onCopy(account) {
    function copyPasswordToClipboard() {
      const el = document.createElement('textarea')
      el.value = account.password
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }

    copyPasswordToClipboard()
  }

  function onLoadMore() {
    setPage(page + 1)
  }

  return (
    <Container>
      <Form
        password={password}
        login={login}
        name={name}
        setPassword={setPassword}
        setLogin={setLogin}
        setName={setName}
        onSubmit={onSubmit}
        onReset={onReset}
      />
      <List
        accounts={accounts}
        onEdit={onEdit}
        onConfirmDelete={onConfirmDelete}
        onCopy={onCopy}
        onLoadMore={onLoadMore}
      />
    </Container>
  )
}

export default Accounts

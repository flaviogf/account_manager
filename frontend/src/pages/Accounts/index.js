import React, { useState } from 'react'
import { toast } from 'react-toastify'

import {
  Container,
  Form,
  FormHeader,
  FormContent,
  FormFooter,
  Title,
  Label,
  Input,
  Button
} from './styles'

import api from '../../services/api'
import session from '../../services/session'

function Accounts() {
  const [name, setName] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  function onSubmit(e) {
    e.preventDefault()

    function getToken() {
      return session.getBearerToken()
    }

    function storeAccount(authorization) {
      return api.post(
        '/account',
        { name, login, password },
        { headers: { authorization } }
      )
    }

    getToken()
      .then(storeAccount)
      .then(() => toast.success('Successfully created account'))
      .catch(() => toast.error('Unable to create account.'))
  }

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <FormHeader>
          <Title>Add new account</Title>
        </FormHeader>

        <FormContent>
          <Label>Name</Label>
          <Input
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            value={name}
            type="text"
          />

          <Label>Login</Label>
          <Input
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Enter login"
            value={login}
            type="text"
          />

          <Label>Password</Label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            value={password}
            type="password"
          />
        </FormContent>

        <FormFooter>
          <Button type="submit">Save account</Button>
        </FormFooter>
      </Form>
    </Container>
  )
}

export default Accounts

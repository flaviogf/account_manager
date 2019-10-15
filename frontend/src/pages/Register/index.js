import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

import {
  Container,
  Links,
  Form,
  Title,
  FormContent,
  Label,
  Input,
  FormFooter,
  Button
} from './styles'

import api from '../../services/api'

function Register({ history }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function onSubmit(e) {
    e.preventDefault()

    function storeAccount() {
      return api
        .post('/user', { name, email, username, password })
        .then((res) => res.data)
    }

    storeAccount()
      .then(() => toast.success('Successfully created account.'))
      .then(() => history.push('/'))
      .catch(() => toast.error('Unable to create account.'))
  }

  return (
    <Container>
      <Links>
        <Link to="/">Sign In</Link>
        <Link to="/register">Register</Link>
      </Links>

      <Form onSubmit={onSubmit}>
        <FormContent>
          <Title>Create your account to start</Title>

          <Label>Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your name"
          />

          <Label>Email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
          />

          <Label>Username</Label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter your username"
          />

          <Label>Password</Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
          />
        </FormContent>

        <FormFooter>
          <Button>Create account</Button>
        </FormFooter>
      </Form>
    </Container>
  )
}

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default Register

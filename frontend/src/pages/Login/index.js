import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

import {
  Container,
  Links,
  Form,
  FormContent,
  FormFooter,
  Title,
  Label,
  Input,
  Button
} from './styles'

import api from '../../services/api'
import session from '../../services/session'

function Login({ history }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (!session.isAuthenticated()) {
      return
    }

    history.push('/accounts')
  }, [history])

  function onSubmit(e) {
    e.preventDefault()

    api
      .post('/session', { username, password })
      .then((res) => res.data)
      .then(session.setToken)
      .then(() => history.push('/accounts'))
      .catch(() => toast.error('Invalid username or password.'))
  }

  return (
    <Container>
      <Links>
        <Link to="/">Sign In</Link>
        <Link to="/register">Register</Link>
      </Links>

      <Form onSubmit={onSubmit}>
        <FormContent>
          <Title>Sign in to start</Title>

          <Label>Username</Label>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            value={username}
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
          <Button type="submit">Sign In</Button>
        </FormFooter>
      </Form>
    </Container>
  )
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default Login

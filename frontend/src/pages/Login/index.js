import React from 'react'

import {
  Container,
  Form,
  FormContent,
  FormFooter,
  Title,
  Label,
  Input,
  Button
} from './styles'

function Login() {
  return (
    <Container>
      <Form>
        <FormContent>
          <Title>Sign in to start</Title>

          <Label>Username</Label>
          <Input placeholder="Enter username" />

          <Label>Username</Label>
          <Input placeholder="Enter password" />
        </FormContent>

        <FormFooter>
          <Button>Sign In</Button>
        </FormFooter>
      </Form>
    </Container>
  )
}

export default Login

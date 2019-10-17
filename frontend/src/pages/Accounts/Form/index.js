import React from 'react'
import PropTypes from 'prop-types'

import {
  Container,
  Header,
  Content,
  Footer,
  Title,
  Label,
  Input,
  Button
} from './styles'

function Form({
  onSubmit,
  onReset,
  setPassword,
  setLogin,
  setName,
  password,
  login,
  name
}) {
  return (
    <Container onSubmit={onSubmit}>
      <Header>
        <Title>Add new account</Title>
      </Header>

      <Content>
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
      </Content>

      <Footer>
        <Button type="button" info onClick={onReset}>
          Reset
        </Button>
        <Button type="submit">Save</Button>
      </Footer>
    </Container>
  )
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setLogin: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default Form

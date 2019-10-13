import React from 'react'
import PropTypes from 'prop-types'

import { Container, Header, Input, Table, Button } from './styles'

function List({ accounts }) {
  return (
    <Container>
      <Header>
        <Input placeholder="Search" />
      </Header>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {accounts.map((it) => (
            <tr key={it.id}>
              <td>{it.name}</td>
              <td>{it.login}</td>
              <td>
                <Button type="button">Edit</Button>
                <Button type="button" danger>
                  Delete
                </Button>
                <Button type="button" info>
                  Copy
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

List.propTypes = {
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      login: PropTypes.string.isRequired
    })
  ).isRequired
}

export default List

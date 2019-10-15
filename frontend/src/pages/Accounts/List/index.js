import React from 'react'
import PropTypes from 'prop-types'

import {
  Container,
  Header,
  Input,
  Table,
  ActionButton,
  Footer,
  LoadMoreButton
} from './styles'

function List({ accounts, page, setPage }) {
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
                <ActionButton type="button">Edit</ActionButton>
                <ActionButton type="button" danger>
                  Delete
                </ActionButton>
                <ActionButton type="button" info>
                  Copy
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Footer>
        <LoadMoreButton onClick={() => setPage(page + 1)}>
          Load more..
        </LoadMoreButton>
      </Footer>
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
  ).isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired
}

export default List

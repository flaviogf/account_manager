import React from 'react'
import PropTypes from 'prop-types'

import {
  Container,
  Header,
  Input,
  Content,
  Table,
  Footer,
  LoadMoreButton
} from './styles'

import ListItem from '../ListItem'

function List({
  accounts,
  onSearch,
  onEdit,
  onConfirmDelete,
  onCopy,
  onLoadMore
}) {
  function debounce(delay, fn) {
    let timeout = null

    return (e) => {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => fn(e), delay)
      e.persist()
    }
  }

  return (
    <Container>
      <Header>
        <Input onChange={debounce(500, onSearch)} placeholder="Search" />
      </Header>

      <Content>
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
              <ListItem
                key={it.id}
                onEdit={onEdit}
                onConfirmDelete={onConfirmDelete}
                onCopy={onCopy}
                account={it}
              />
            ))}
          </tbody>
        </Table>
      </Content>

      <Footer>
        <LoadMoreButton onClick={onLoadMore}>Load more..</LoadMoreButton>
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
  onSearch: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onConfirmDelete: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired
}

export default List

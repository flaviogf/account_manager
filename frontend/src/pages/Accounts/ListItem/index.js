import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Button } from './styles'

function ListItem({ account, onEdit, onConfirmDelete, onCopy }) {
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setConfirmDeleteVisible(false), 1000)

    return () => clearTimeout(timeout)
  }, [confirmDeleteVisible])

  return (
    <tr>
      <td>{account.name}</td>
      <td>{account.login}</td>
      <td>
        <Button type="button" onClick={() => onEdit(account)}>
          Edit
        </Button>

        {!confirmDeleteVisible && (
          <Button
            type="button"
            onClick={() => setConfirmDeleteVisible(true)}
            warning
          >
            Delete
          </Button>
        )}

        {confirmDeleteVisible && (
          <Button type="button" onClick={() => onConfirmDelete(account)} danger>
            Confirm
          </Button>
        )}

        <Button type="button" onClick={() => onCopy(account)} info>
          Copy
        </Button>
      </td>
    </tr>
  )
}

ListItem.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onConfirmDelete: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  account: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired
}

export default ListItem

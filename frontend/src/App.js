import React from 'react'
import { toast } from 'react-toastify'

import Styles from './styles'
import Routes from './routes'

toast.configure({})

function App() {
  return (
    <>
      <Styles />
      <Routes />
    </>
  )
}

export default App

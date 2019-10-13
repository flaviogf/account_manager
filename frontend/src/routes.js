import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route paht="/register" component={Register} />
      </Switch>
    </Router>
  )
}

export default Routes

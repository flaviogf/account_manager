import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Accounts from './pages/Accounts'
import Login from './pages/Login'
import Register from './pages/Register'

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/accounts" component={Accounts} />
      </Switch>
    </Router>
  )
}

export default Routes

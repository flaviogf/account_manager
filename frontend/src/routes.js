import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import PropTypes from 'prop-types'

import Accounts from './pages/Accounts'
import Login from './pages/Login'
import Register from './pages/Register'

import session from './services/session'

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={({ location }) => {
        return session.isAuthenticated() ? (
          <Component />
        ) : (
          <Redirect to="/" state={{ from: location }} />
        )
      }}
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired
}

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/accounts" component={Accounts} />
      </Switch>
    </Router>
  )
}

export default Routes

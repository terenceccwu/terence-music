import React from 'react'
import { Route, Link } from 'react-router-dom'

// source:
// https://reacttraining.com/react-router/web/api/Route/children-func
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/NavLink.js

const ListItemLink = ({ to, exact, ...rest }) => (
  <Route path={to} exact={exact} children={({ match }) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} {...rest}/>
    </li>
  )}/>
)

export default ListItemLink

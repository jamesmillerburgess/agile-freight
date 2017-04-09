import React from 'react';
import { Route, NavLink, Redirect } from 'react-router-dom';

export default class CustomerConfiguration extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { customer } = this.props;
    return (
      <div className="customer-quotes">
        <div className="content-navbar">
          <NavLink to={`/customer/${customer._id}/configuration/general`}>
            General
          </NavLink>
          <NavLink to={`/customer/${customer._id}/configuration/addresses`}>
            Addresses
          </NavLink>
          <NavLink to={`/customer/${customer._id}/configuration/documents`}>
            Documents
          </NavLink>
          <NavLink to={`/customer/${customer._id}/configuration/accounts`}>
            Accounts
          </NavLink>
        </div>
        <div className="content-body">
          <Route path={`/customer/${customer._id}/configuration`} exact>
            <Redirect to={`/customer/${customer._id}/configuration/general`} />
          </Route>
        </div>
      </div>
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import { Route, NavLink, Redirect } from 'react-router-dom';

const CustomerConfiguration = ({ customer }) => (
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

CustomerConfiguration.propTypes = {
  customer: PropTypes.object,
};

export default CustomerConfiguration;

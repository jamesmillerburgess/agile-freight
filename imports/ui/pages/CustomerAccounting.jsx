import React from 'react';
import { Route, NavLink, Redirect } from 'react-router-dom';

import AccountingList from '../lists/AccountingList';

export default class CustomerAccounting extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { customer } = this.props;
    return (
      <div className="customer-quotes">
        <div className="content-navbar">
          <NavLink to={`/customer/${customer._id}/accounting/active`}>
            Active <span className="item-count">4</span>
          </NavLink>
          <NavLink to={`/customer/${customer._id}/accounting/all`}>
            All <span className="item-count">17</span>
          </NavLink>
          <NavLink to={`/customer/${customer._id}/accounting/new-invoice`}>
            <i className="fa fa-fw fa-plus" /> Invoice
          </NavLink>
          <NavLink to={`/customer/${customer._id}/accounting/new-credit-note`}>
            <i className="fa fa-fw fa-plus" /> Credit Note
          </NavLink>
        </div>
        <div className="content-body">
          <Route path={`/customer/${customer._id}/accounting`} exact>
            <Redirect to={`/customer/${customer._id}/accounting/active`} />
          </Route>
          <Route
            path={`/customer/${customer._id}/accounting/active`}
            render={props => <AccountingList {...props} customer={customer} filter="active" />}
          />
          <Route
            path={`/customer/${customer._id}/accounting/all`}
            render={props => <AccountingList {...props} customer={customer} filter="all" />}
          />
        </div>
      </div>
    );
  }
}

import React from 'react';
import { Route, NavLink, Redirect } from 'react-router-dom';

import CargoList from '../lists/CargoList';

export default class CustomerCargo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { customer } = this.props;
    return (
      <div className="customer-quotes">
        <div className="content-navbar">
          <NavLink to={`/customer/${customer._id}/cargo/active`}>
            Active <span className="item-count">4</span>
          </NavLink>
          <NavLink to={`/customer/${customer._id}/cargo/all`}>
            All <span className="item-count">17</span>
          </NavLink>
          <NavLink to={`/customer/${customer._id}/cargo/new-receipt`}>
            <i className="fa fa-fw fa-plus" /> Receipt
          </NavLink>
          <NavLink to={`/customer/${customer._id}/cargo/new-booking`}>
            <i className="fa fa-fw fa-plus" /> Booking
          </NavLink>
          <NavLink to={`/customer/${customer._id}/cargo/new-consol`}>
            <i className="fa fa-fw fa-plus" /> Consol
          </NavLink>
        </div>
        <div className="content-body">
          <Route path={`/customer/${customer._id}/cargo`} exact>
            <Redirect to={`/customer/${customer._id}/cargo/active`} />
          </Route>
          <Route
            path={`/customer/${customer._id}/cargo/active`}
            render={props => <CargoList {...props} customer={customer} filter="active" />}
          />
          <Route
            path={`/customer/${customer._id}/cargo/all`}
            render={props => <CargoList {...props} customer={customer} filter="all" />}
          />
        </div>
      </div>
    );
  }
}

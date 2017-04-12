import React from 'react';
import PropTypes from 'prop-types';
import { Route, NavLink, Redirect } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Shipments } from '../../api/shipments/shipments';

import ShipmentList from '../lists/ShipmentList.jsx';

class CustomerShipmentsInner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { customer, shipments, activeShipments } = this.props;
    return (
      <div className="customer-quotes">
        <div className="content-navbar">
          <NavLink to={`/customer/${customer._id}/shipments/active`}>
            Active <span className="item-count">{activeShipments.length}</span>
          </NavLink>
          <NavLink to={`/customer/${customer._id}/shipments/all`}>
            All <span className="item-count">{shipments.length}</span>
          </NavLink>
          <NavLink to={`/customer/${customer._id}/shipments/new-receipt`}>
            <i className="fa fa-fw fa-plus" /> Receipt
          </NavLink>
          <NavLink to={`/customer/${customer._id}/shipments/new-booking`}>
            <i className="fa fa-fw fa-plus" /> Booking
          </NavLink>
          <NavLink to={`/customer/${customer._id}/shipments/new-consol`}>
            <i className="fa fa-fw fa-plus" /> Consol
          </NavLink>
        </div>
        <div className="content-body">
          <Route path={`/customer/${customer._id}/shipments`} exact>
            <Redirect to={`/customer/${customer._id}/shipments/active`} />
          </Route>
          <Route
            path={`/customer/${customer._id}/shipments/active`}
            render={props => <ShipmentList {...props} shipments={activeShipments} />}
          />
          <Route
            path={`/customer/${customer._id}/shipments/all`}
            render={props => <ShipmentList {...props} shipments={shipments} />}
          />
        </div>
      </div>
    );
  }
}

CustomerShipmentsInner.propTypes = {
  customer: PropTypes.object.isRequired,
  shipments: PropTypes.array.isRequired,
  activeShipments: PropTypes.array.isRequired,
};

const CustomerShipment = createContainer((props) => {
  const { customer } = props;
  const shipments = Shipments
    .find({ _id: { $in: customer.shipments } })
    .fetch()
    .sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
  const activeShipments = shipments
    .filter(shipment => shipment.status !== 'Canceled' && shipment.status !== 'Closed');
  return {
    customer,
    shipments,
    activeShipments,
  };
}, CustomerShipmentsInner);

export default CustomerShipment;

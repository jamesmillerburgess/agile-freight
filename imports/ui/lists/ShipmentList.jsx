import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

class ShipmentListInner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr className="list-header">
            <th />
            <th>Goods</th>
            <th>Mode</th>
            <th>Route</th>
            <th>Terms</th>
            <th>Last Updated By</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.shipments.map(shipment =>
              <tr key={shipment._id}>
                <th>
                  {shipment.shipmentCode}<br />
                  Received
                </th>
                <td>
                  20 Boxes<br />
                  239.000 kg<br />
                  4.219 cbm
                </td>
                <td>{shipment.mode} {shipment.service}</td>
                <td>INNSA - GBFXT</td>
                <td>{shipment.direction} {shipment.incoterm}</td>
                <td>{Meteor.users.findOne(shipment.lastUpdatedBy).profile.name}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    );
  }
}

ShipmentListInner.propTypes = {
  shipments: PropTypes.array,
};

const ShipmentList = createContainer((props) => {
  const { shipments } = props;
  return {
    shipments,
  };
}, ShipmentListInner);

export default ShipmentList;

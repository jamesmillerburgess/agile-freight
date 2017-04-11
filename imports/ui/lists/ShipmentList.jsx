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
                  {shipment.status}
                </th>
                <td>
                  {shipment.cargo.totalPackages} {shipment.cargo.totalPackagesType}<br />
                  {shipment.cargo.totalGrossWeightKG} kg<br />
                  {shipment.cargo.totalVolumeCBM} cbm
                </td>
                <td>{shipment.mode} {shipment.service}</td>
                <td>{shipment.route}</td>
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
  shipments: PropTypes.array.isRequired,
};

const ShipmentList = createContainer((props) => {
  const { shipments } = props;
  return { shipments };
}, ShipmentListInner);

export default ShipmentList;
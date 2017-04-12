import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import moment from 'moment';

import { UIGlobals } from '../ui-globals';

class ShipmentListInner extends React.Component {
  render() {
    return (
      <div className="table-container">
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
                <tr
                  key={shipment._id}
                  className={
                    shipment.status === 'Closed' || shipment.status === 'Canceled' ?
                      'inactive' :
                      ''
                  }
                >
                  <th>
                    {shipment.shipmentCode}<br />
                    {shipment.status}<br />
                    {moment(shipment.creationDate).format(UIGlobals.dateFormat)}
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
                </tr>,
              )
            }
          </tbody>
        </table>
      </div>
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

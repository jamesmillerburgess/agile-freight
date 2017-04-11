import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import moment from 'moment';

import { UIGlobals } from '../ui-globals';

import { Shipments } from '../../api/shipments/shipments';

class InvoiceListInner extends React.Component {
  render() {
    return (
      <div className="table-container">
        <table className="table table-hover">
          <thead>
            <tr className="list-header">
              <th />
              <th>Amount</th>
              <th>Shipments</th>
              <th>Issued Date</th>
              <th>Issued By</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.invoices.map(invoice =>
                <tr
                  key={invoice._id}
                  className={
                    invoice.status === 'Closed' || invoice.status === 'Canceled' ?
                      'inactive' :
                      ''
                  }
                >
                  <th>
                    {invoice.invoiceCode}<br />
                    {invoice.status}
                  </th>
                  <td>{invoice.amount} {invoice.currency}</td>
                  <td>
                    {
                      invoice.shipments.map(shipment =>
                        <div key={shipment}>
                          {Shipments.findOne(shipment).shipmentCode}
                        </div>
                      )
                    }
                  </td>
                  <td>{moment(invoice.issuedDate).format(UIGlobals.dateFormat)}</td>
                  <td>{Meteor.users.findOne(invoice.issuedBy).profile.name}</td>
                </tr>,
              )
            }
            <tr>
              <th>
                I5671023<br />
                Invoice
              </th>
              <td>32,928 INR</td>
              <td>
                J285012<br />
                J158210
              </td>
              <td>02-Apr-2017</td>
              <td>James Burgess</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

InvoiceListInner.propTypes = {
  invoices: PropTypes.array.isRequired,
};

const InvoiceList = createContainer((props) => {
  const { invoices } = props;
  return { invoices };
}, InvoiceListInner);

export default InvoiceList;

import React from 'react';
import PropTypes from 'prop-types';
import { Route, NavLink, Redirect } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Invoices } from '../../api/invoices/invoices-collection';

import InvoiceList from '../lists/InvoiceList.jsx';

class CustomerInvoicesInner extends React.Component {
  render() {
    const { customer, activeInvoices, invoices } = this.props;
    return (
      <div className="customer-quotes">
        <div className="content-navbar">
          <NavLink to={`/customer/${customer._id}/invoices/active`}>
            Active <span className="item-count">{activeInvoices.length}</span>
          </NavLink>
          <NavLink to={`/customer/${customer._id}/invoices/all`}>
            All <span className="item-count">{invoices.length}</span>
          </NavLink>
          <NavLink to={`/customer/${customer._id}/invoices/new-invoice`}>
            <i className="fa fa-fw fa-plus" /> Invoice
          </NavLink>
          <NavLink to={`/customer/${customer._id}/invoices/new-credit-note`}>
            <i className="fa fa-fw fa-plus" /> Credit Note
          </NavLink>
        </div>
        <div className="content-body">
          <Route path={`/customer/${customer._id}/invoices`} exact>
            <Redirect to={`/customer/${customer._id}/invoices/active`} />
          </Route>
          <Route
            path={`/customer/${customer._id}/invoices/active`}
            render={props => <InvoiceList {...props} invoices={activeInvoices} />}
          />
          <Route
            path={`/customer/${customer._id}/invoices/all`}
            render={props => <InvoiceList {...props} invoices={invoices} />}
          />
        </div>
      </div>
    );
  }
}

CustomerInvoicesInner.propTypes = {
  customer: PropTypes.object.isRequired,
  invoices: PropTypes.array.isRequired,
  activeInvoices: PropTypes.array.isRequired,
};

const CustomerInvoices = createContainer((props) => {
  const { customer } = props;
  const invoices = Invoices
    .find({ _id: { $in: customer.invoices } })
    .fetch()
    .sort((a, b) => new Date(b.issuedDate) - new Date(a.issuedDate));
  const activeInvoices = invoices
    .filter(invoice => invoice.status !== 'Canceled' && invoice.status !== 'Closed');
  return {
    customer,
    invoices,
    activeInvoices,
  };
}, CustomerInvoicesInner);

export default CustomerInvoices;

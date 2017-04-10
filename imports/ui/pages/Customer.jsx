import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Route, NavLink } from 'react-router-dom';

import CustomerOverview from './CustomerOverview';
import CustomerQuotes from './CustomerQuotes';
import CustomerCargo from './CustomerCargo';
import CustomerAccounting from './CustomerAccounting';
import CustomerConfiguration from './CustomerConfiguration';

import { Customers } from '../../api/customers/customers';
import { Quotes } from '../../api/quotes/quotes';
import { Jobs } from '../../api/jobs/jobs';


class Customer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { customer } = this.props;
    return (
      <div>
        <div>
          <div className="row">
            <div className="col-2 sidebar">
              <div className="sidebar-section-spacer" />
              <div className="sidebar-section-header">
                CUSTOMER
              </div>
              <NavLink
                to={`/customer/${customer._id}/overview`}
                activeClassName="active"
              >
                Overview
              </NavLink>
              <NavLink
                to={`/customer/${customer._id}/quotes`}
                activeClassName="active"
              >
                Quotes
              </NavLink>
              <NavLink
                to={`/customer/${customer._id}/cargo`}
                activeClassName="active"
              >
                Cargo
              </NavLink>
              <NavLink
                to={`/customer/${customer._id}/accounting`}
                activeClassName="active"
              >
                Accounting
              </NavLink>
              <NavLink
                to={`/customer/${customer._id}/configuration`}
                activeClassName="active"
              >
                Configuration
              </NavLink>
              <div className="sidebar-section-spacer" />
              <div className="sidebar-section-header">
                UPDATES
              </div>
              {/*<MentionFieldContainer />*/}
            </div>
            <div className="col-10 content">
              <div className="content-header">
                {customer.name}
              </div>
              <Route
                path={`/customer/${customer._id}/overview`}
                render={props => <CustomerOverview {...props} customer={customer} />}
              />
              <Route
                path={`/customer/${customer._id}/quotes`}
                render={props => <CustomerQuotes {...props} customer={customer} />
                }
              />
              <Route
                path={`/customer/${customer._id}/cargo`}
                render={props => <CustomerCargo {...props} customer={customer} />}
              />
              <Route
                path={`/customer/${customer._id}/accounting`}
                render={props => <CustomerAccounting {...props} customer={customer} />}
              />
              <Route
                exact
                path={`/customer/${customer._id}/configuration`}
                render={props => <CustomerConfiguration {...props} customer={customer} />}
              />

            </div>
          </div>
        </div>
      </div>
    );
  }
}

Customer.propTypes = {
  loading: PropTypes.bool,
  customer: PropTypes.object,
  quotes: PropTypes.array,
  jobs: PropTypes.array,
};

const CustomerContainer = createContainer((props) => {
  const branch = Meteor.subscribe('branch.active');
  const loading = !branch.ready();
  const customerId = props.match.params.id;
  return {
    loading,
    customer: Customers.findOne(customerId),
    quotes: Quotes.find({ 'customer.id': customerId }).fetch(),
    jobs: Jobs.find({ $or: [{ shipper: customerId }, { consignee: customerId }] }).fetch(),
  };
}, Customer);

export default CustomerContainer;

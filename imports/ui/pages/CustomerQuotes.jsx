import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { Route, NavLink, Redirect } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';

import QuoteList from '../lists/QuoteList';

class CustomerQuotesInner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { customer } = this.props;
    return (
      <div className="customer-quotes">
        <div className="content-navbar">
          <NavLink to={`/customer/${customer._id}/quotes/active`}>
            Active <span className="item-count">4</span>
          </NavLink>
          <NavLink to={`/customer/${customer._id}/quotes/all`}>
            All <span className="item-count">17</span>
          </NavLink>
          <NavLink to={`/customer/${customer._id}/quotes/new`}>
            <i className="fa fa-fw fa-plus" /> New
          </NavLink>
        </div>
        <div className="content-body">
          <Route path={`/customer/${customer._id}/quotes`} exact>
            <Redirect to={`/customer/${customer._id}/quotes/active`} />
          </Route>
          <Route
            path={`/customer/${customer._id}/quotes/active`}
            render={props => <QuoteList {...props} customer={customer} filter="active" />}
          />
          <Route
            path={`/customer/${customer._id}/quotes/all`}
            render={props => <QuoteList {...props} customer={customer} filter="all" />}
          />
        </div>
      </div>
    );
  }
}

CustomerQuotesInner.propTypes = {
  loading: PropTypes.bool,
  customer: PropTypes.object,
};

const CustomerQuotes = createContainer((props) => {
  const branch = Meteor.subscribe('branch.active');
  const loading = !branch.ready();
  const { customer } = props;
  return {
    loading,
    customer,
  };
}, CustomerQuotesInner);

export default CustomerQuotes;

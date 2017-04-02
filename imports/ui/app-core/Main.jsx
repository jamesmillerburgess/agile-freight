import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Route } from 'react-router-dom';

import { Customers } from '../../api/customers/customers';

import CustomerListContainer from '../lists/CustomerList.jsx';
import CustomerContainer from '../object-view-pages/Customer.jsx';

// App component - represents the whole app
class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loading } = this.props;
    return (
      <div>
        <div className="container content">
          <Route path="/customers" render={props => <CustomerListContainer {...props} loading={loading} />} />
          <Route path="/customer/:id" render={props => <CustomerContainer {...props} loading={loading} />} />
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  loading: React.PropTypes.bool,
  customers: React.PropTypes.array,
};

const MainContainer = createContainer(() => {
  const branch = Meteor.subscribe('branch.active');
  const loading = !branch.ready();
  return {
    loading,
  };
}, Main);

export default MainContainer;

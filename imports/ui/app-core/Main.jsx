import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Customers } from '../../api/customers/customers';

import CustomerList from '../lists/CustomerList.jsx';

// App component - represents the whole app
class Main extends Component {
  constructor(props) {
    super(props);
  }

  path() {
    return this.props.location.pathname;
  }

  content() {
    if (this.path() === '/customers') {
      return <CustomerList loading={this.props.loading} customers={this.props.customers}/>;
    }
    return <h1>Not /customers !</h1>;
  }

  render() {
    return (
      <div>
        <div className="container content">
          {this.content()}
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
    customers: Customers.find({}).fetch(),
  };
}, Main);

export default MainContainer;

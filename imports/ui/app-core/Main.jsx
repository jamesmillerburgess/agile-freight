import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Route } from 'react-router-dom';

import CustomerListContainer from '../lists/CustomerList.jsx';
import CustomerContainer from '../object-view-pages/Customer.jsx';
import JobContainer from '../object-view-pages/Job.jsx';

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
          <Route
            path="/customers"
            render={props => <CustomerListContainer {...props} />}
          />
          <Route
            path="/customer/:id"
            render={props => <CustomerContainer {...props} />}
          />
          <Route
            path="/job/:id"
            render={props => <JobContainer {...props} />}
          />
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  loading: React.PropTypes.bool,
};

const MainContainer = createContainer(() => {
  const branch = Meteor.subscribe('branch.active');
  const loading = !branch.ready();
  return {
    loading,
  };
}, Main);

export default MainContainer;

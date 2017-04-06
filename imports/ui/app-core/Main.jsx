import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Route, Redirect } from 'react-router-dom';

import CustomerListContainer from '../lists/CustomerList.jsx';
import CustomerContainer from '../object-view-pages/Customer.jsx';
import JobContainer from '../object-view-pages/Job.jsx';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';

// App component - represents the whole app
class Main extends Component {
  constructor(props) {
    super(props);
  }

  verifyAuth(component, props) {
    if (Meteor.user() || Meteor.loggingIn()) {
      return React.createElement(component, props);
    }
    return <Redirect to={{ pathname: '/sign-in' }} />;
  }

  render() {
    return (
      <div>
        <div className="container content">
          <Route
            path="/sign-up"
            render={props => <SignUp {...props} />}
          />
          <Route
            path="/sign-in"
            render={props => <SignIn {...props} />}
          />
          <Route
            path="/customers"
            render={props => this.verifyAuth(CustomerListContainer, props)}
          />
          <Route
            path="/customer/:id"
            render={props => this.verifyAuth(CustomerContainer, props)}
          />
          <Route
            path="/job/:id"
            render={props => this.verifyAuth(JobContainer, props)}
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

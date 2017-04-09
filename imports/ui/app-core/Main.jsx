import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Nav from '../../ui/app-core/Nav.jsx';
import CustomerListContainer from '../lists/CustomerList.jsx';
import CustomerContainer from '../pages/Customer.jsx';
import JobContainer from '../object-view-pages/Job.jsx';
import UserProfile from '../object-view-pages/UserProfile.jsx';
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
    const { loading } = this.props;
    return (
      <BrowserRouter>
        <Route
          render={props => (
            <div>
              <Nav {...props} />
              {loading ? '...' :
                <div className="container page">
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
                  <Route
                    path="/user-profile"
                    render={props => this.verifyAuth(UserProfile, props)}
                  />
                </div>

              }
            </div>
          )}
        />
      </BrowserRouter>
    );
  }
}

Main.propTypes = {
  loading: PropTypes.bool,
};

const MainContainer = createContainer(() => {
  const branch = Meteor.subscribe('branch.active');
  const loading = !branch.ready();
  return {
    loading,
  };
}, Main);

export default MainContainer;

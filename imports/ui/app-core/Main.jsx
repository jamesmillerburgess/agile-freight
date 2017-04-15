import { Meteor } from 'meteor/meteor';
import React from 'react';
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


const Main = ({ loading }) => {
  const verifyAuth = (component, props) => {
    if (Meteor.user() || Meteor.loggingIn()) {
      return React.createElement(component, props);
    }
    return <Redirect to={{ pathname: '/sign-in' }} />;
  };

  return (
    <BrowserRouter>
      <Route
        render={props => (
          <div>
            <Nav {...props} />
            {loading ?
              '...' :
              <div className="container page">
                <Route
                  path="/sign-up"
                  render={routeProps => <SignUp {...routeProps} />}
                />
                <Route
                  path="/sign-in"
                  render={routeProps => <SignIn {...routeProps} />}
                />
                <Route
                  path="/customers"
                  render={routeProps => verifyAuth(CustomerListContainer, routeProps)}
                />
                <Route
                  path="/customer/:id"
                  render={routeProps => verifyAuth(CustomerContainer, routeProps)}
                />
                <Route
                  path="/job/:id"
                  render={routeProps => verifyAuth(JobContainer, routeProps)}
                />
                <Route
                  path="/user-profile"
                  render={routeProps => verifyAuth(UserProfile, routeProps)}
                />
              </div>
            }
          </div>
        )}
      />
    </BrowserRouter>
  );
};

Main.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const MainContainer = createContainer(() => {
  const branch = Meteor.subscribe('branch.active');
  const loading = !branch.ready();
  return {
    loading,
  };
}, Main);

export default MainContainer;

import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

// All the pages to render
import Nav from '../../ui/app-core/Nav.jsx';
import Home from '../pages/Home.jsx';
import CustomerList from '../lists/CustomerList.jsx';
import Customer from '../pages/Customer.jsx';
import UserProfile from '../editors/UserProfile.jsx';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';

const MainInner = ({ loading }) => {
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
          <div className="app-inner">
            <Nav {...props} />
            {loading ?
              '' :
              <div className="content-container">
                <Route
                  path="/"
                  exact
                  render={routeProps => <Home {...routeProps} />}
                />
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
                  render={routeProps => verifyAuth(CustomerList, routeProps)}
                />
                <Route
                  path="/customer/:id"
                  render={routeProps => verifyAuth(Customer, routeProps)}
                />
                <Route
                  path="/profile"
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

MainInner.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const Main = createContainer(() => {
  const branch = Meteor.subscribe('branch.active');
  const loading = !branch.ready();
  return {
    loading,
  };
}, MainInner);

export default Main;

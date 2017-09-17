import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

// All the pages to render
import Nav from '../../ui/app-core/Nav.jsx';
import Home from '../pages/Home.jsx';
import CustomerListConnect from '../lists/CustomerListConnect.jsx';
import SupplierList from '../lists/SupplierList.jsx';
import EditCustomerConnect from '../editors/EditCustomerConnect';
import EditSupplierConnect from '../editors/EditSupplierConnect';
import CustomerConnect from '../pages/CustomerConnect';
import RateList from '../lists/RateList.jsx';
import EditRateConnect from '../editors/EditRateConnect.jsx';
import UserProfileConnect from '../editors/EditUserProfileConnect.jsx';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import BranchList from '../lists/BranchList.jsx';
import EditBranchConnect from '../editors/EditBranchConnect.jsx';

const MainInner = ({ loading }) => {
  const verifyAuth = (component, props) => {
    if (Meteor.user() || Meteor.loggingIn()) {
      return React.createElement(component, props);
    }
    return <Redirect to={{ pathname: '/sign-in' }} />;
  };

  const verifyAdminAuth = (component, props) => {
    if (Meteor.user() && Meteor.user().profile && Meteor.user().profile.admin) {
      return React.createElement(component, props);
    }
    return <Redirect to={{ pathname: '/' }} />;
  };

  return (
    <BrowserRouter>
      <Route
        render={props =>
          <div className="app-inner">
            <Nav {...props} />
            {loading
              ? ''
              : <div className="content-container">
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
                    exact
                    render={routeProps =>
                      verifyAuth(CustomerListConnect, routeProps)}
                  />
                  <Route
                    path="/customers/new"
                    exact
                    render={routeProps =>
                      verifyAuth(EditCustomerConnect, routeProps)}
                  />
                  <Route
                    path="/customers/view/:customerId"
                    render={routeProps =>
                      verifyAuth(CustomerConnect, routeProps)}
                  />
                  <Route
                    path="/customers/edit/:customerId"
                    render={routeProps =>
                      verifyAuth(EditCustomerConnect, {
                        ...routeProps,
                        editMode: true,
                      })}
                  />
                  <Route
                    path="/suppliers"
                    exact
                    render={routeProps =>
                      verifyAuth(SupplierList, { ...routeProps })}
                  />
                  <Route
                    path="/suppliers/new"
                    exact
                    render={routeProps =>
                      verifyAuth(EditSupplierConnect, { ...routeProps })}
                  />
                  <Route
                    path="/rates"
                    exact
                    render={routeProps =>
                      verifyAdminAuth(RateList, {
                        ...routeProps,
                      })}
                  />
                  <Route
                    path="/rates/new"
                    render={routeProps =>
                      verifyAdminAuth(EditRateConnect, {
                        ...routeProps,
                      })}
                  />
                  <Route
                    path="/rates/edit/:rateId"
                    render={routeProps =>
                      verifyAdminAuth(EditRateConnect, {
                        ...routeProps,
                        editMode: true,
                      })}
                  />
                  <Route
                    path="/profile"
                    render={routeProps =>
                      verifyAuth(UserProfileConnect, {
                        ...routeProps,
                        editMode: true,
                      })}
                  />
                  <Route
                    path="/branches"
                    exact
                    render={routeProps =>
                      verifyAdminAuth(BranchList, routeProps)}
                  />
                  <Route
                    path="/branches/new"
                    exact
                    render={routeProps =>
                      verifyAdminAuth(EditBranchConnect, routeProps)}
                  />
                  <Route
                    path="/branches/edit/:branchId"
                    render={routeProps =>
                      verifyAdminAuth(EditBranchConnect, {
                        ...routeProps,
                        editMode: true,
                      })}
                  />
                </div>}
          </div>}
      />
    </BrowserRouter>
  );
};

MainInner.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const Main = createContainer(() => {
  const branches = Meteor.subscribe('branch.all');
  let branch;
  if (Meteor.user() && Meteor.user().profile && Meteor.user().profile.branch) {
    branch = Meteor.subscribe('branch.active', Meteor.user().profile.branch);
  } else {
    branch = Meteor.subscribe('branch.active');
  }

  const loading = !branch.ready() || !branches.ready();
  return {
    loading,
  };
}, MainInner);

export default Main;

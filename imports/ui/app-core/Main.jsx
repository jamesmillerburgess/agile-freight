import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

// All the pages to render
import Nav from '../../ui/app-core/Nav.jsx';
import Home from '../pages/Home.jsx';
import CustomerListConnect from '../lists/CustomerListConnect.jsx';
import EditCustomerConnect from '../editors/EditCustomerConnect';
import Customer from '../pages/Customer.jsx';
import UserProfile from '../editors/UserProfile.jsx';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import QuoteEmail from '../../ui/objects/QuoteEmail.jsx';
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
                  exact
                  render={routeProps => verifyAuth(CustomerListConnect, routeProps)}
                />
                <Route
                  path="/customers/new"
                  exact
                  render={routeProps => verifyAuth(EditCustomerConnect, routeProps)}
                />
                <Route
                  path="/customers/view/:customerId"
                  render={routeProps => verifyAuth(Customer, routeProps)}
                />
                <Route
                  path="/profile"
                  render={routeProps => verifyAuth(UserProfile, routeProps)}
                />
                <Route
                  path="/branches"
                  exact
                  render={routeProps => verifyAdminAuth(BranchList, routeProps)}
                />
                <Route
                  path="/branches/new"
                  exact
                  render={routeProps => verifyAdminAuth(EditBranchConnect, routeProps)}
                />
                <Route
                  path="/branches/edit/:branchId"
                  render={routeProps => verifyAdminAuth(EditBranchConnect, {
                    ...routeProps,
                    editMode: true,
                  })}
                />
                <Route
                  path="/email-test"
                  message={`Dear James,

    Here is the quote you requested!`}
                  render={routeProps =>
                    <QuoteEmail
                      {...routeProps}
                      quote={{
                        expiryDate: new Date('01 January 2017'),
                        cargo: {
                          cargoType: 'Loose',
                          packageLines: [
                            {
                              numPackages: 1,
                              packageType: 'Package',
                              length: 123,
                              width: 123,
                              height: 123,
                              weight: 123,
                              weightUOM: 'kg',
                              volume: 1.861,
                              volumeUOM: 'cbm',
                              totalWeight: 123,
                            },
                          ],
                          containerLines: [],
                          totalPackages: 1,
                          totalVolume: 1.861,
                          volumeUOM: 'cbm',
                          totalWeight: 123,
                          weightUOM: 'kg',
                          hazardous: true,
                          temperatureControlled: true,
                        },
                        movement: {
                          pickup: {
                            locationName: 'Berat',
                            isPort: false,
                          },
                          delivery: {
                            locationName: 'Fituita',
                            isPort: false,
                          },
                        },
                        otherServices: {
                          insurance: true,
                          customsClearance: true,
                        },
                        charges: {
                          chargeLines: [
                            {
                              group: 'Origin',
                              name: 'sdfaf',
                              units: 1,
                              rate: 'KG',
                              unitPrice: 123,
                              unitPriceCurrency: 'AED',
                              amount: 123,
                              finalAmount: 98.40,
                            },
                            {
                              group: 'International',
                              name: '12',
                              units: 12,
                              rate: 'KG',
                              unitPrice: 123,
                              unitPriceCurrency: 'ALL',
                              amount: 1476,
                              finalAmount: 1771.20,
                            },
                            {
                              group: 'Destination',
                              name: 'qwdqw',
                              units: 1,
                              rate: 'Container',
                              unitPrice: 23,
                              unitPriceCurrency: 'AMD',
                              amount: 23,
                              finalAmount: 23,
                            },
                          ],
                          currency: 'AMD',
                          totalOriginCharges: 98.4,
                          totalInternationalCharges: 1771.2,
                          totalDestinationCharges: 23,
                          totalCharges: '1892.60',
                          notes: `adsgadsgsaFdsa
G
sdag
sdg
sd`,
                          fxConversions: {
                            AED: { rate: 0.8, active: true },
                            ALL: { rate: 1.2, active: true },
                          },
                        },
                      }}
                    />
                  }
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
  const branches = Meteor.subscribe('branch.all');
  let branch;
  if (
    Meteor.user() &&
    Meteor.user().profile &&
    Meteor.user().profile.branch
  ) {
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

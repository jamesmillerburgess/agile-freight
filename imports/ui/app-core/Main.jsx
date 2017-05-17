import {Meteor} from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';

// All the pages to render
import Nav from '../../ui/app-core/Nav.jsx';
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
    return <Redirect to={{ pathname: '/sign-in' }}/>;
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
                  render={
                    () => (
                      <div className="">
                        <div className="content home">
                          <div className="splash-image-container" />
                          <div className="home-kpis-container">
                            <div className="heading">NEWS</div>
                            <span className="news-item">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque elit, scelerisque vulputate dolor id, aliquam venenatis enim.</span>
                            <div className="heading">TODAY</div>
                            <div className="horizontal-kpi">
                              <span className="label">QUOTES</span><span className="value">46</span>
                            </div>
                            <div className="horizontal-kpi">
                              <span className="label">SHIPMENTS</span><span className="value">12</span>
                            </div>
                            <div className="horizontal-kpi">
                              <span className="label">INVOICES</span><span className="value">10</span>
                            </div>
                            <div className="heading">MAY</div>
                            <div className="horizontal-kpi">
                              <span className="label">NET REVENUE</span><span className="value">87 k</span>
                            </div>
                            <div className="horizontal-kpi">
                              <span className="label">JOBS/FTE</span><span className="value">52</span>
                            </div>
                            <div className="horizontal-kpi">
                              <span className="label">NEW CUSTOMERS</span><span className="value">4</span>
                            </div>
                          </div>
                        </div>
                        <div className="content-footer-accent home-footer-accent" />
                      </div>
                    )
                  }
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

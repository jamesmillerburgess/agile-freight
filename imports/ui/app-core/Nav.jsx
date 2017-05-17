import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';

const NavInner = ({ user, history }) => {
  const logout = () => Meteor.logout(() => history.push('/sign-in'));

  return (
    <nav className="navbar navbar-toggleable-md navbar-light navbar-inverse">
      <button
        className="navbar-toggler" type="button" data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01" aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"/>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <div className="navbar-brand">
          <button className="brand">
            <span className="brand-highlight">AGILITY</span> FREIGHT
          </button>
        </div>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <button className="button customers-button">
              <span className="label">
                CUSTOMERS
              </span>
            </button>
          </li>
          <li className="nav-item">
            <button className="button rates-button">
              <span className="label">
                RATES
              </span>
            </button>
          </li>
          <li className="nav-item">
            <button className="button profile-button">
              <span className="label">
                PROFILE
              </span>
            </button>
          </li>
        </ul>
        <div className="form-inline">
          <input className="focis-input mr-sm-2 search" type="text" placeholder="Search..."/>
        </div>
        {user ?
          <form className="form-inline my-2 my-lg-0">
            <div className="dropdown">
              <button className="sign-in-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className="label">{user.profile.name.toUpperCase()}</div>
              </button>
              <div className="dropdown-menu">
                <div className="a-container">
                  <button className="dropdown-item">
                    <span className="label">
                      <span className="fa fa-fw fa-pencil"/>
                      EDIT PROFILE
                    </span>
                  </button>
                </div>
                <div className="a-container">
                  <button className="dropdown-item" onClick={logout}>
                    <span className="label">
                      <span className="fa fa-fw fa-sign-out"/>
                      SIGN OUT
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </form>
          :
          <form className="form-inline my-2 my-lg-0">
            <button className="sign-in-button">
              <span className="label">SIGN IN</span>
            </button>
          </form>
        }
      </div>
    </nav>
  );
};

NavInner.propTypes = {
  history: PropTypes.object,
  user: PropTypes.object,
};

const Nav = createContainer((props) => {
  const { history } = props;
  const user = Meteor.user();
  return {
    history,
    user,
  };
}, NavInner);

export default Nav;

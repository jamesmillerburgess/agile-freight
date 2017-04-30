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
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <Link to="/" className="navbar-brand">Agility Freight</Link>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <Link to="/customers" className="nav-link">
              Customers <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/rates" className="nav-link">Rates</Link>
          </li>
        </ul>
        <form className="form-inline">
          <input className="focis-input mr-sm-2" type="text" placeholder="Search" />
        </form>
        {user ?
          <form className="form-inline my-2 my-lg-0">
            <div className="dropdown">
              <a
                id="navbar-profile-button"
                className="profile-button btn btn-secondary"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img className="profile-pic" src="/lib/jburgess%20profile%20pic.png" alt="" />
                <span className="user-name">{user.profile.name}</span>
              </a>
              <div className="dropdown-menu">
                <div className="a-container">
                  <Link to="/user-profile" id="edit-profile-link" className="dropdown-item">
                    <i className="fa fa-fw fa-pencil" />
                    Edit Profile
                  </Link>
                </div>
                <div className="a-container">
                  <a
                    id="sign-out-link"
                    className="dropdown-item"
                    onClick={logout}
                  >
                    <i className="fa fa-fw fa-sign-out" />
                    Sign Out
                  </a>
                </div>
              </div>
            </div>
          </form> :

          <form className="form-inline my-2 my-lg-0">
            <Link
              to="/sign-in"
              className="profile-button btn btn-secondary"
            >
              <span className="user-name">
                Sign In
              </span>
            </Link>
          </form>
        }
        <div className="alert-button-container">
          <button className="alert-button btn btn-secondary">
            <i className="fa fa-fw fa-bell-o alert-icon" />
          </button>
        </div>
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

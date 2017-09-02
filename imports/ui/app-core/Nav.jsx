import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Link, NavLink } from 'react-router-dom';
import Select from 'react-select';
import { createContainer } from 'meteor/react-meteor-data';

const NavInner = ({ user, history }) => {
  const options = [
    { value: 'name', label: 'Name' },
    { value: 'profile', label: 'Profile' },
    { value: 'logout', label: 'Logout' },
  ];
  if (Meteor.user() && Meteor.user().profile && Meteor.user().profile.admin) {
    options.push({ value: 'branches', label: 'Branches' });
  }
  const onChange = (values) => {
    if (values[1].value === 'logout') {
      Meteor.logout(() => history.push('/sign-in'));
    }
    if (values[1].value === 'profile') {
      history.push('/profile');
    }
    if (values[1].value === 'branches') {
      history.push('/branches');
    }
  };

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
        <div className="navbar-brand">
          <Link to="/" className="brand">
            <span className="brand-highlight">AGILE</span> FREIGHT
          </Link>
        </div>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <NavLink to="/customers" className="nav-item">
            <button className="button customers-button">
              <span className="label">
                CUSTOMERS
              </span>
            </button>
          </NavLink>
          <NavLink to="/rates" className="nav-item">
            <button className="button rates-button">
              <span className="label">
                RATES
              </span>
            </button>
          </NavLink>
          <li>
            <div className="form-inline">
              <input className="focis-input mr-sm-2 search" type="text" placeholder="Search..." />
            </div>
          </li>
        </ul>

        {user ?
          <div className="form-inline my-2 my-lg-0">
            <Select
              className="sign-in-button"
              arrowRenderer={() => null}
              valueRenderer={() => Meteor.user().profile.name}
              placeholder={Meteor.user().profile.name}
              value="name"
              clearable={false}
              searchable={false}
              multi
              autosize
              options={options}
              onChange={onChange}
            />
          </div>
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
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  user: PropTypes.object,
};

const Nav = createContainer((props) => {
  const { history } = props;
  const user        = Meteor.user();
  return {
    history,
    user,
  };
}, NavInner);

export default Nav;

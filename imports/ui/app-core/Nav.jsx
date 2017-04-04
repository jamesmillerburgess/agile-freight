import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

// App component - represents the whole app
export default class Nav extends Component {

  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarTogglerDemo01"
                aria-controls="navbarTogglerDemo01" aria-expanded="false"
                aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link to="/" className="navbar-brand">FOCiS</Link>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link to="/customers" className="nav-link">Customers <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/quotes" className="nav-link">Quotes</Link>
            </li>
            <li className="nav-item">
              <Link to="/jobs" className="nav-link">Jobs</Link>
            </li>
            <li className="nav-item">
              <Link to="/rates" className="nav-link">Rates</Link>
            </li>
          </ul>
          <form className="form-inline">
            <input className="focis-input mr-sm-2" type="text" placeholder="Search"/>
          </form>
          <form className="form-inline my-2 my-lg-0 dropdown">
            <a id="navbar-profile-button" className="profile-button btn btn-secondary"
               data-toggle="dropdown"
               aria-haspopup="true"
               aria-expanded="false">
              <img className="profile-pic" src="/lib/jburgess%20profile%20pic.png" />
              <span className="user-name">James</span>
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <div className="a-container">
                <Link to="/edit-profile" id="edit-profile-link"className="dropdown-item">
                  <i className="fa fa-fw fa-pencil" />
                  Edit Profile
                </Link>
              </div>
              <div className="a-container">
                <a
                  id="sign-out-link"
                  href="#"
                  className="dropdown-item"
                  onClick={Meteor.logout}
                >
                  <i className="fa fa-fw fa-sign-out"/>
                  Sign Out
                </a>
              </div>
            </div>
          </form>
          <div className="alert-button-container">
            <button className="alert-button btn btn-secondary">
              <i className="fa fa-fw fa-bell-o alert-icon"/>
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

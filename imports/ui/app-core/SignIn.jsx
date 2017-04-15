import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

const SignIn = ({ history }) => {
  let emailInput;
  let passwordInput;

  const login = (event) => {
    event.preventDefault();
    Meteor
      .loginWithPassword(
        emailInput.value,
        passwordInput.value,
        () => history.push('/customers', {}),
      );
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-4 sign-in-card">
        <div className="at-form">
          <div className="at-title">
            <h3>Sign In</h3>
          </div>
          <div className="at-pwd-form">
            <form role="form" id="at-pwd-form" noValidate="">
              <fieldset>
                <div className="at-input form-group has-feedback">
                  <label className="control-label" htmlFor="at-field-email">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="at-field-email"
                    ref={el => emailInput = el}
                    name="at-field-email"
                    placeholder="Email"
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                  <span className="help-block hide" />
                </div>
                <div className="at-input form-group has-feedback">
                  <label className="control-label" htmlFor="at-field-password">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="at-field-password"
                    ref={el => passwordInput = el}
                    name="at-field-password"
                    placeholder="Password"
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                </div>
                <button
                  className="at-btn submit btn btn-lg btn-block btn-default"
                  id="at-btn"
                  onClick={login}
                >
                  Sign In
                </button>
              </fieldset>
            </form>
            <div className="at-signup-link">
              <p>
                Don't have an account?
                <Link to="/sign-up" id="at-signUp" className="at-link at-signup"> Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object,
};

export default SignIn;

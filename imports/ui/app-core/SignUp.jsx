import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';

const SignUp = ({ history }) => {
  const inputs = {};

  const register = (event) => {
    const { email, password, passwordAgain } = inputs;
    event.preventDefault();
    if (password.value === passwordAgain.value) {
      const user = {
        email: email.value,
        password: password.value,
        profile: { name: 'New User' },
      };
      Accounts.createUser(user, () => history.push('/', {}));
    } else {
      // TODO: Handle unmatched password fields
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-4 sign-in-card">
        <div className="at-form">
          <div className="at-title">
            <h3>Sign Up</h3>
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
                    ref={el => inputs.email = el}
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
                    ref={el => inputs.password = el}
                    name="at-field-password"
                    placeholder="Password"
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                </div>
                <div className="at-input form-group has-feedback">
                  <label className="control-label" htmlFor="at-field-password">
                    Password (again)
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="at-field-password"
                    ref={el => inputs.passwordAgain = el}
                    name="at-field-password"
                    placeholder="Password"
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                </div>
                <button
                  className="at-btn submit btn btn-lg btn-block btn-default"
                  id="at-btn"
                  onClick={register}
                >
                  Register
                </button>
              </fieldset>
            </form>
            <div className="at-signup-link">
              <p>
                Already have an account?
                <Link to="/sign-in" id="at-signUp" className="at-link at-signup"> Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SignUp.propTypes = {
  history: PropTypes.object,
};

export default SignUp;

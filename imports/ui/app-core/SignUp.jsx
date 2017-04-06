import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordAgain: '',
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordAgainChange = this.handlePasswordAgainChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleEmailChange(event) {
    const newState = this.state;
    newState.email = event.target.value;
    this.setState(newState);
  }

  handlePasswordChange(event) {
    const newState = this.state;
    newState.password = event.target.value;
    this.setState(newState);
  }

  handlePasswordAgainChange(event) {
    const newState = this.state;
    newState.passwordAgain = event.target.value;
    this.setState(newState);
  }

  login(event) {
    event.preventDefault();
    const props = this.props;
    Meteor.loginWithPassword(this.state.email, this.state.password, (error) => {
      props.history.push('/customers', {});
    });
  }

  render() {
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
                      name="at-field-email"
                      placeholder="Email"
                      autoCapitalize="none"
                      autoCorrect="off"
                      onChange={this.handleEmailChange}
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
                      name="at-field-password"
                      placeholder="Password"
                      autoCapitalize="none"
                      autoCorrect="off"
                      onChange={this.handlePasswordChange}
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
                      name="at-field-password"
                      placeholder="Password"
                      autoCapitalize="none"
                      autoCorrect="off"
                      onChange={this.handlePasswordAgainChange}
                    />
                  </div>
                  <button
                    className="at-btn submit btn btn-lg btn-block btn-default"
                    id="at-btn"
                    onClick={this.login}
                  >
                    Sign In
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
  }
}

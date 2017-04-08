import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
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
                  {/*<div className="at-pwd-link">*/}
                    {/*<p>*/}
                      {/*<a*/}
                        {/*href="/forgot-password"*/}
                        {/*id="at-forgotPwd"*/}
                        {/*className="at-link at-pwd"*/}
                      {/*>*/}
                        {/*Forgot your password?*/}
                      {/*</a>*/}
                    {/*</p>*/}
                  {/*</div>*/}
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
                  Don't have an account?
                  <Link to="/sign-up" id="at-signUp" className="at-link at-signup"> Register</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

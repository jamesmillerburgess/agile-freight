import React from 'react';

export default class SignIn extends React.Component {

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-12 col-lg-4 sign-in-card">
          <div className="at-pwd-form">
            <form role="form" id="at-pwd-form" noValidate="" action="#" method="POST">
              <fieldset>
                <div className="at-input form-group has-feedback">
                  <label className="control-label" htmlFor="at-field-email">
                    Email
                  </label>
                  <input type="email" className="form-control" id="at-field-email"
                         name="at-field-email"
                         placeholder="Email" autoCapitalize="none" autoCorrect="off"/>
                  <span className="help-block hide"/>
                </div>
                <div className="at-input form-group has-feedback">
                  <label className="control-label" htmlFor="at-field-password">
                    Password
                  </label>
                  <input type="password" className="form-control" id="at-field-password"
                         name="at-field-password" placeholder="Password" autoCapitalize="none"
                         autoCorrect="off"/>
                </div>
                <div className="at-pwd-link">
                  <p>
                    <a href="/forgot-password" id="at-forgotPwd" className="at-link at-pwd">Forgot
                      your
                      password?</a>
                  </p>
                </div>
                <button
                  type="submit"
                  className="at-btn submit btn btn-lg btn-block btn-default"
                  id="at-btn"
                >
                  Sign In
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
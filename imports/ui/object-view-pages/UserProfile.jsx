import React from 'react';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="panel">
        <div className="panel-header">
          <div className="panel-header-inner">
            <div className="icon-container hidden-md-down">
              <i className="icon fa fa-fw fa-user"/>
            </div>
            <div className="panel-header-content container">
              <div className="row">
                <div className="panel-title col-12 col-lg-6 align-left">
                  User Profile
                </div>
                <div className="col-6 col-lg-3 align-right">
                </div>
                <div className="col-6 col-lg-3 align-right">
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="panel-body">
          <div className="panel-body-inner">
            <div className="row">
              <div className="col-12 col-lg-3">
                {/*{{> field name}}*/}
              </div>
              <div className="col-12 col-lg-3">
                {/*{{> field email}}*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  loading: React.PropTypes.bool,
  job: React.PropTypes.object,
};

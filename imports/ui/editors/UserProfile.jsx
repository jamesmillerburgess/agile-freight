import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import FreeTextField from '../fields/FreeTextField.jsx';
import TextareaField from '../fields/TextareaField.jsx';

class UserProfileInner extends React.Component {
  updateValue(path, value) {
    if (Meteor.user()[path] !== value) {
      Meteor.call('users.updateField', Meteor.user()._id, path, value);
    }
  }

  render() {
    return (
      <div className="panel">
        <div className="panel-header">
          <div className="panel-header-inner">
            <div className="icon-container hidden-md-down">
              <i className="icon fa fa-fw fa-user" />
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
                <div className="label">
                  Name
                </div>
                {Meteor.loggingIn() ?
                  <span>Loading</span> :
                  <FreeTextField
                    value={Meteor.user().profile.name}
                    path="profile.name"
                    valueUpdateCallback={this.updateValue}
                  />
                }
              </div>
              <div className="col-12 col-lg-3">
                <div className="label">
                  Address
                </div>
                {Meteor.loggingIn() ?
                  <span>Loading</span> :
                  <TextareaField
                    value={Meteor.user().profile.address}
                    path="profile.address"
                    valueUpdateCallback={this.updateValue}
                  />
                }
              </div>
              <div className="col-12 col-lg-3">
                <div className="label">
                  Email
                </div>
                {Meteor.loggingIn() ?
                  <span>Loading</span> :
                  <FreeTextField
                    value={Meteor.user().emails[0].address}
                    path="emails[0].address"
                    valueUpdateCallback={this.updateValue}
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const UserProfile = createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, UserProfileInner);

export default UserProfile;

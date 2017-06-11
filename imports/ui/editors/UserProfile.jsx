import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import BranchField from '../fields/BranchField.jsx';

const UserProfile = (props) => {

  return (
    <div className="">
      <div className="content customer">
        <div className="process-header">
          <div className="title">
            {
              props.editMode ?
                'NEW USER PROFILE' :
                'EDIT USER PROFILE'
            }
          </div>
          <Link to="/customers">
            <button className="button-primary">BACK TO CUSTOMER LIST</button>
          </Link>
        </div>
        <div className="panel container">
          <div className="row">
            <div className="col">
              <div className="vertical-input-group">
                <span className="label">BRANCH</span>
                <BranchField
                  value={props.user.profile.branch}
                  options={Branches.find().fetch()}
                  onChange={value => props.dispatchers.setUserBranch(value._id)}
                />
              </div>
              <div className="vertical-input-group">
                <span className="label">NAME</span>
                <input
                  value={props.user.profile.name}
                  onChange={e => props.dispatchers.setUserName(e.target.value)}
                />
              </div>
              <div className="vertical-input-group">
                <span className="label">ADDRESS</span>
                <textarea
                  className="address"
                  value={props.user.profile.address}
                  onChange={e => props.dispatchers.setUserAddress(e.target.value)}
                />
              </div>
              <div className="vertical-input-group">
                <span className="label">EMAIL ADDRESS</span>
                <input
                  value={props.user.profile.emailAddress}
                  onChange={e => props.dispatchers.setUserEmailAddress(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button
            className="button-submit"
            onClick={() => {
              if (props.editMode) {
                const { customerId } = props.match.params;
                Meteor.call('user.save', customerId, props.customer, () => {
                  props.history.push(`/customers/view/${customerId}/overview`);
                });
              } else {
                Meteor.call('user.new', props.customer, (err, res) => {
                  props.history.push(`/customers/view/${res}/overview`);
                });
              }
            }}
          >
            SAVE USER PROFILE
          </button>
        </div>
      </div>
      <div className="content-footer-accent admin-footer-accent" />
    </div>
  );
};

export default UserProfile;

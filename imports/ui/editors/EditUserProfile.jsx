import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import BranchField from '../fields/BranchField.jsx';
import { Branches } from '../../api/branch/branchCollection';

const EditUserProfile = (props) => {

  return (
    <div className="">
      <div className="content customer">
        <div className="process-header">
          <div className="title">
            {
              props.editMode ?
                'EDIT USER PROFILE' :
                'NEW USER PROFILE'
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
                  value={props.userProfile.branch}
                  options={Branches.find().fetch()}
                  onChange={value => props.dispatchers.setUserProfileBranch(value._id)}
                />
              </div>
              <div className="vertical-input-group">
                <span className="label">NAME</span>
                <input
                  value={props.userProfile.name}
                  onChange={e => props.dispatchers.setUserProfileName(e.target.value)}
                />
              </div>
              <div className="vertical-input-group">
                <span className="label">EMAIL ADDRESS</span>
                <input
                  value={props.userProfile.emailAddress}
                  onChange={e => props.dispatchers.setUserProfileEmailAddress(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button
            className="button-submit"
            onClick={() => {
              if (props.editMode) {
                const { userId } = Meteor.user()._id;
                Meteor.call('user.save', userId, props.userProfile, () => {
                  props.history.push('/');
                });
              } else {
                Meteor.call('user.new', props.userProfile, () => {
                  props.history.push('/');
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

export default EditUserProfile;

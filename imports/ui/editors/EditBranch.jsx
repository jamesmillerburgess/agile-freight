import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

const EditBranch = props => (
  <div>
    <div className="content admin">
      <div className="process-header">
        <div className="title">
          {
            props.editMode ?
              'EDIT BRANCH' :
              'NEW BRANCH'
          }
        </div>
        <Link to="/branches">
          <button className="button-primary">BACK TO BRANCH LIST</button>
        </Link>
      </div>
      <div className="panel">
        <div className="row">
          <div className="col">
            <div className="vertical-input-group">
              <span className="label">NAME</span>
              <input
                value={props.branch.name}
                onChange={e => props.dispatchers.setBranchName(e.target.value)}
              />
            </div>
          </div>
          <div className="col">
            <div className="vertical-input-group">
              <span className="label">CODE</span>
              <input
                value={props.branch.code}
                onChange={e => props.dispatchers.setBranchCode(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button
          className="button-submit"
          onClick={() => {
            if (props.editMode) {
              Meteor.call('branch.save', props.match.params.branchId, props.branch, () => {
                props.history.push('/branches');
              });
            } else {
              Meteor.call('branch.new', props.branch, () => {
                props.history.push('/branches');
              });
            }
          }}
        >
          SAVE BRANCH
        </button>
      </div>
    </div>
    <div className="content-footer-accent admin-footer-accent" />
  </div>
);

EditBranch.propTypes = {
  editMode: PropTypes.bool,
  branch: PropTypes.shape({
    name: PropTypes.string,
  }),
  dispatchers: PropTypes.objectOf(PropTypes.func),
  history: PropTypes.object,
};

EditBranch.defaultProps = {
  branch: {
    name: '',
  },
};

export default EditBranch;

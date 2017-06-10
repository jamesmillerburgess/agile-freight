import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

const EditBranch = ({ branch, dispatchers, history }) => (
  <div>
    <div className="content admin">
      <div className="process-header">
        <div className="title">NEW BRANCH</div>
        <Link to="/customers">
          <button className="button-primary">BACK TO BRANCH LIST</button>
        </Link>
      </div>
      <div className="panel">
        <div className="row">
          <div className="col">
            <div className="vertical-input-group">
              <span className="label">NAME</span>
              <input
                value={branch.name}
                onChange={e => dispatchers.setBranchName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button
          className="button-submit"
          onClick={() => {
            Meteor.call('branch.new', branch, () => {
              history.push('/branches');
            });
          }}
        >
          CREATE CUSTOMER
        </button>
      </div>
    </div>
    <div className="content-footer-accent admin-footer-accent" />
  </div>
);

EditBranch.propTypes = {
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

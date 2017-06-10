import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Branches } from '../../api/branch/branchCollection';
import BranchListItem from '../list-items/BranchListItem.jsx';

export const BranchListInner = props => (
  <div>
    <div className="content admin">
      <div className="process-header">
        <div className="title">BRANCH LIST</div>
        <Link to="/customers/new">
          <button className="button-primary">NEW BRANCH</button>
        </Link>
      </div>
      {
        props.branches.map(branch => (
          <BranchListItem
            key={branch._id}
            branch={branch}
            history={props.history}
          />
        ))
      }
    </div>
    <div className="content-footer-accent admin-footer-accent" />
  </div>
);

BranchListInner.propTypes = {
  branches: PropTypes.array,
  history: PropTypes.object,
};

const BranchList = createContainer(() => ({
  branches: Branches.find().fetch(),
}), BranchListInner);

export default BranchList;

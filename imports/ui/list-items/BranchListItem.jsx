import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BranchListItem = (props) => {
  const branchLink = `/branches/edit/${props.branch._id}`;

  return (
    <Link className="list-item" to={branchLink}>
      <div className="panel">
        <div className="icon-column" />
        <div className="container panel-body">
          <div className="row no-gutters">
            <div className="col-4">
              <span className="label">{props.branch.name}</span><br />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

BranchListItem.propTypes = {
  branch: PropTypes.object,
};

export default BranchListItem;

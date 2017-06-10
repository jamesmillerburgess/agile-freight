import { connect } from 'react-redux';

import EditBranch from './EditBranch.jsx';
import * as actionCreators from '../../state/actions/branchActions';

const mapStateToProps = ({ customer }) => ({ customer });

const mapDispatchToProps = dispatch => ({
  dispatchers: {
    loadBranch: customer =>
      dispatch(actionCreators.loadBranch(customer)),
    setBranchName: name =>
      dispatch(actionCreators.setBranchName(name)),
  },
});

const EditBranchConnect =
        connect(mapStateToProps, mapDispatchToProps)(EditBranch);

export default EditBranchConnect;

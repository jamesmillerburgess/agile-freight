import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';

import EditUserProfile from './EditUserProfile.jsx';
import * as actionCreators from '../../state/actions/userProfileActions';

const mapStateToProps = ({ userProfile }) => ({ userProfile });

const mapDispatchToProps = (dispatch, ownProps) => {
  if (ownProps.editMode) {
    console.log(Meteor.user());
    const userProfile = {
      ...Meteor.user().profile,
      emailAddress: Meteor.user().emails[0].address,
    };
    dispatch(actionCreators.loadUserProfile(userProfile));
  }
  return {
    dispatchers: {
      loadUserProfile: userProfile =>
        dispatch(actionCreators.loadUserProfile(userProfile)),
      setUserProfileName: name =>
        dispatch(actionCreators.setUserProfileName(name)),
      setUserProfileEmailAddress: emailAddress =>
        dispatch(actionCreators.setUserProfileEmailAddress(emailAddress)),
      setUserProfileBranch: branch =>
        dispatch(actionCreators.setUserProfileBranch(branch)),
    },
  };
};

const EditUserProfileConnect =
        connect(mapStateToProps, mapDispatchToProps)(EditUserProfile);

export default EditUserProfileConnect;

import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';

import CustomerList from './CustomerList.jsx';
import * as actionCreators from '../../state/actions/customerListActions';

const mapStateToProps = ({ customerList }) => ({ customerList });

const mapDispatchToProps = (dispatch) => {
  if (Meteor.user() && Meteor.user().profile && Meteor.user().profile.branch) {
    dispatch(actionCreators.setCustomerListFilter(Meteor.user().profile.branch));
  }
  return {
    dispatchers: {
      setCustomerListFilter: filter =>
        dispatch(actionCreators.setCustomerListFilter(filter)),
    },
  };
};

const CustomerListConnect =
        connect(mapStateToProps, mapDispatchToProps)(CustomerList);

export default CustomerListConnect;

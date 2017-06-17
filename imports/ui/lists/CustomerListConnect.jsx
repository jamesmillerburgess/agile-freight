import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';

import CustomerList from './CustomerList.jsx';
import { setCustomerListFilter } from '../../state/actions/customerListActions';
import { loadCustomer } from '../../state/actions/customerActions';

const mapStateToProps = ({ customerList }) => ({ customerList });

const mapDispatchToProps = (dispatch) => {
  if (Meteor.user() && Meteor.user().profile && Meteor.user().profile.branch) {
    dispatch(setCustomerListFilter(Meteor.user().profile.branch));
  }
  return {
    dispatchers: {
      setCustomerListFilter: filter =>
        dispatch(setCustomerListFilter(filter)),
      loadCustomer: customer =>
        dispatch(loadCustomer(customer)),
    },
  };
};

const CustomerListConnect =
        connect(mapStateToProps, mapDispatchToProps)(CustomerList);

export default CustomerListConnect;

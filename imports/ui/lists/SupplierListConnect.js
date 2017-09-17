import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';

import SupplierList from './SupplierList.jsx';
import { setListFilter } from '../../state/actions/listActions';
import { loadSupplier } from '../../state/actions/supplierActions';

const mapStateToProps = ({ list }) => ({ list });

const mapDispatchToProps = (dispatch) => {
  if (Meteor.user() && Meteor.user().profile && Meteor.user().profile.branch) {
    dispatch(setListFilter(Meteor.user().profile.branch));
  }
  return {
    dispatchers: {
      setListFilter: filter =>
        dispatch(setListFilter(filter)),
      loadSupplier: customer =>
        dispatch(loadSupplier(customer)),
    },
  };
};

const SupplierListConnect =
  connect(mapStateToProps, mapDispatchToProps)(SupplierList);

export default SupplierListConnect;

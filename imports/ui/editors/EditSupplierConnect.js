import { connect } from 'react-redux';

import { Suppliers } from '../../api/suppliers/supplierCollection';
import EditSupplier from './EditSupplier.jsx';
import * as actions from '../../state/actions/supplierActions';

const mapStateToProps = ({ supplier }) => ({ supplier });

const mapDispatchToProps = (dispatch, ownProps) => {
  if (ownProps.editMode) {
    const supplier = Suppliers.findOne(ownProps.match.params.supplierId);
    dispatch(actions.loadSupplier(supplier));
  }
  return {
    dispatchers: {
      setName: val => dispatch(actions.setSupplierName(val)),
      setAddress: val => dispatch(actions.setSupplierAddress(val)),
      setEmailAddress: val => dispatch(actions.setSupplierEmailAddress(val)),
      setCurrency: val => dispatch(actions.setSupplierCurrency(val)),
      setBranch: val => dispatch(actions.setSupplierBranch(val)),
    },
  };
};

const EditSupplierConnect = connect(mapStateToProps, mapDispatchToProps)(
  EditSupplier,
);

export default EditSupplierConnect;

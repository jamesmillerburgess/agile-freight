import { connect } from 'react-redux';

import EditCustomer from './EditCustomer.jsx';
import * as actionCreators from '../../state/actions/customerActions';
import { Customers } from '../../api/customers/customersCollection';

const mapStateToProps = ({ customer }) => ({ customer });

const mapDispatchToProps = (dispatch, ownProps) => {
  if (ownProps.editMode) {
    const customer = Customers.findOne(ownProps.match.params.customerId);
    dispatch(actionCreators.loadCustomer(customer));
  }
  return {
    dispatchers: {
      loadCustomer: customer =>
        dispatch(actionCreators.loadCustomer(customer)),
      setCustomerName: name =>
        dispatch(actionCreators.setCustomerName(name)),
      setCustomerAddress: address =>
        dispatch(actionCreators.setCustomerAddress(address)),
      setCustomerEmailAddress: emailAddress =>
        dispatch(actionCreators.setCustomerEmailAddress(emailAddress)),
      setCustomerCurrency: currency =>
        dispatch(actionCreators.setCustomerCurrency(currency)),
      setCustomerBranch: branch =>
        dispatch(actionCreators.setCustomerBranch(branch)),
    },
  };
}

const EditCustomerConnect =
        connect(mapStateToProps, mapDispatchToProps)(EditCustomer);

export default EditCustomerConnect;

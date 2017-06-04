import { connect } from 'react-redux';

import EditCustomer from './EditCustomer.jsx';
import * as actionCreators from '../../state/actions/customerActions';

const mapStateToProps = ({ customer }) => ({ customer });

const mapDispatchToProps = dispatch => ({
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
});

const EditCustomerConnect =
        connect(mapStateToProps, mapDispatchToProps)(EditCustomer);

export default EditCustomerConnect;

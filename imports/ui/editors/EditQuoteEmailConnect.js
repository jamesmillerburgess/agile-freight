import { connect } from 'react-redux';

import EditQuoteEmail from './EditQuoteEmail.jsx';
import * as actionCreators from '../../state/actions/emailActions';

const mapStateToProps = state => ({ ...state.email, ...state.newQuote });

const mapDispatchToProps = dispatch => ({
  setEmailIsOpen: (id, code) => dispatch(actionCreators.setEmailIsOpen(id, code)),
  setEmailTo: (id, name) => dispatch(actionCreators.setEmailTo(id, name)),
  setEmailCC: (id, rate) => dispatch(actionCreators.setEmailCC(id, rate)),
  setEmailSubject: (id, units) => dispatch(actionCreators.setEmailSubject(id, units)),
  setEmailMessage: (id, unitPrice) => dispatch(actionCreators.setEmailMessage(id, unitPrice)),
});

const EditQuoteEmailConnect = connect(mapStateToProps, mapDispatchToProps)(EditQuoteEmail);

export default EditQuoteEmailConnect;

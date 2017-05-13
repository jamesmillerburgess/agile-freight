import { connect } from 'react-redux';

import EditQuoteChargeList from './EditQuoteChargeList.jsx';
import * as actionCreators from '../../state/actions/newQuoteActions';

const mapStateToProps = (state, ownProps) => ({
  chargeLines: state.newQuote.charges.chargeLines
    .filter(chargeLine => chargeLine.group === ownProps.group),
});

const mapDispatchToProps = dispatch => ({
  removeChargeLine: index => dispatch(actionCreators.removeChargeLine(index)),
});

const EditQuoteChargeListConnect = connect(mapStateToProps, mapDispatchToProps)(EditQuoteChargeList);

export default EditQuoteChargeListConnect;

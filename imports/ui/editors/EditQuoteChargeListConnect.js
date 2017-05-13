import { connect } from 'react-redux';

import EditQuoteChargeList from './EditQuoteChargeList.jsx';
import * as actionCreators from '../../state/actions/newQuoteActions';

const mapStateToProps = (state, ownProps) => ({
  chargeLines: state.newQuote.charges.chargeLines
    .filter(chargeLine => chargeLine.group === ownProps.group),
});

const mapDispatchToProps = dispatch => ({
  setChargeLineCode: (id, code) => dispatch(actionCreators.setChargeLineCode(id, code)),
  setChargeLineName: (id, name) => dispatch(actionCreators.setChargeLineName(id, name)),
  setChargeLineRate: (id, rate) => dispatch(actionCreators.setChargeLineRate(id, rate)),
  setChargeLineUnits: (id, units) => dispatch(actionCreators.setChargeLineUnits(id, units)),
  setChargeLineUnitPrice: (id, unitPrice) => dispatch(actionCreators.setChargeLineUnitPrice(id, unitPrice)),
  removeChargeLine: id => dispatch(actionCreators.removeChargeLine(id)),
});

const EditQuoteChargeListConnect = connect(mapStateToProps, mapDispatchToProps)(EditQuoteChargeList);

export default EditQuoteChargeListConnect;

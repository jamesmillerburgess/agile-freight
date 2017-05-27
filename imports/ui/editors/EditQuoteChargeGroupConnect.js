import { connect } from 'react-redux';

import EditQuoteChargeGroup from './EditQuoteChargeGroup.jsx';
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
  setChargeLineUnitPrice: (id, unitPrice) =>
    dispatch(actionCreators.setChargeLineUnitPrice(id, unitPrice)),
  setChargeLineUnitPriceCurrency: (id, unitPriceCurrency) =>
    dispatch(actionCreators.setChargeLineUnitPriceCurrency(id, unitPriceCurrency)),
  removeChargeLine: id => dispatch(actionCreators.removeChargeLine(id)),
});

const EditQuoteChargeGroupConnect =
        connect(mapStateToProps, mapDispatchToProps)(EditQuoteChargeGroup);

export default EditQuoteChargeGroupConnect;

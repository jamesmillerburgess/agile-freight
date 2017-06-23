import { connect } from 'react-redux';

import EditQuoteChargeGroup from './EditQuoteChargeGroup.jsx';
import * as actionCreators from '../../state/actions/quoteActions';

const mapStateToProps = (state, ownProps) => ({
  currency: state.quote.charges.currency,
  fxConversions: state.quote.charges.fxConversions,
  chargeLines: state.quote.charges.chargeLines
                    .filter(chargeLine => chargeLine.group === ownProps.group),
});

const mapDispatchToProps = dispatch => ({
  setChargeLineCode: (id, code) => dispatch(actionCreators.setChargeLineCode(
    id,
    code,
  )),
  setChargeLineName: (id, name) => dispatch(actionCreators.setChargeLineName(
    id,
    name,
  )),
  setChargeLineSelectedRate: (chargeLine, selectedRate) => {
    const { id, applicableSellRates } = chargeLine;
    let basis = null;
    let unitPrice = null;
    let currency = null;
    if (applicableSellRates[selectedRate]) {
      basis = applicableSellRates[selectedRate].basis;
      unitPrice = applicableSellRates[selectedRate].unitPrice;
      currency = applicableSellRates[selectedRate].currency;
    }
    dispatch(actionCreators.setChargeLineSelectedRate(id, selectedRate));
    if (selectedRate !== 'custom') {
      dispatch(actionCreators.setChargeLineBasis(id, basis));
      dispatch(actionCreators.setChargeLineUnitPrice(id, unitPrice));
      dispatch(actionCreators.setChargeLineUnitPriceCurrency(id, currency));
    }
  },
  setChargeLineBasis: (chargeLine, basis) => {
    const { id, selectedRate } = chargeLine;
    if (selectedRate !== 'custom') {
      dispatch(actionCreators.setChargeLineSelectedRate(id, 'custom'));
    }
    dispatch(actionCreators.setChargeLineBasis(id, basis));
  },
  setChargeLineUnits: (id, units) => dispatch(actionCreators.setChargeLineUnits(
    id,
    units,
  )),
  setChargeLineUnitPrice: (chargeLine, unitPrice) => {
    const { id, selectedRate } = chargeLine;
    if (selectedRate !== 'custom') {
      dispatch(actionCreators.setChargeLineSelectedRate(id, 'custom'));
    }
    dispatch(actionCreators.setChargeLineUnitPrice(id, unitPrice));
  },
  setChargeLineUnitPriceCurrency: (id, unitPriceCurrency) =>
    dispatch(actionCreators.setChargeLineUnitPriceCurrency(
      id,
      unitPriceCurrency,
    )),
  removeChargeLine: id => dispatch(actionCreators.removeChargeLine(id)),
});

const EditQuoteChargeGroupConnect =
  connect(mapStateToProps, mapDispatchToProps)(EditQuoteChargeGroup);

export default EditQuoteChargeGroupConnect;

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
    let newRate = null;
    let newUnitPrice = null;
    let newUnitPriceCurrency = null;
    if (applicableSellRates[selectedRate]) {
      newRate = applicableSellRates[selectedRate].rate;
      newUnitPrice = applicableSellRates[selectedRate].unitPrice;
      newUnitPriceCurrency =
        applicableSellRates[selectedRate].unitPriceCurrency;
    }
    dispatch(actionCreators.setChargeLineSelectedRate(id, selectedRate));
    dispatch(actionCreators.setChargeLineRate(id, newRate));
    dispatch(actionCreators.setChargeLineUnitPrice(id, newUnitPrice));
    dispatch(actionCreators.setChargeLineUnitPriceCurrency(
      id,
      newUnitPriceCurrency,
    ));
  },
  setChargeLineRate: (id, rate) => dispatch(actionCreators.setChargeLineRate(
    id,
    rate,
  )),
  setChargeLineUnits: (id, units) => dispatch(actionCreators.setChargeLineUnits(
    id,
    units,
  )),
  setChargeLineUnitPrice: (id, unitPrice) =>
    dispatch(actionCreators.setChargeLineUnitPrice(id, unitPrice)),
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

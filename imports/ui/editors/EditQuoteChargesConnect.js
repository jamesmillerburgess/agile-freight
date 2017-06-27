import { connect } from 'react-redux';

import EditQuoteCharges from './EditQuoteCharges.jsx';
import {
  loadQuote,
  addChargeLine,
  setChargeNotes,
  setFXConversionRate,
  setQuoteCurrency,
} from '../../state/actions/quoteActions';
import { loadEmail } from '../../state/actions/emailActions';
import { getAmount } from '../quoteUtils';

const mapStateToProps = (state) => {
  const quote = state.quote;
  return {
    quote: {
      ...quote,
      charges: {
        ...quote.charges,
        chargeLines: quote.charges.chargeLines.map(
          chargeLine => ({ ...chargeLine, amount: getAmount(chargeLine) }),
        ),
      },
    },
  };
};

const mapDispatchToProps = dispatch => ({
  onLoad: quote => dispatch(loadQuote(quote)),
  addChargeLine: chargeLine => dispatch(addChargeLine(chargeLine)),
  setChargeNotes: notes => dispatch(setChargeNotes(notes)),
  loadEmail: email => dispatch(loadEmail(email)),
  setFXConversionRate: (
    currency,
    rate,
  ) => dispatch(setFXConversionRate(currency, rate)),
  setQuoteCurrency: currency => dispatch(setQuoteCurrency(currency)),
});

const EditQuoteChargesConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  EditQuoteCharges);

export default EditQuoteChargesConnect;

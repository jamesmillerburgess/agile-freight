import { connect } from 'react-redux';

import EditQuoteCharges from './EditQuoteCharges.jsx';
import { loadQuote, addChargeLine, setChargeNotes, setFXConversionRate, setQuoteCurrency } from '../../state/actions/quoteActions';
import { loadEmail } from '../../state/actions/emailActions';

const mapStateToProps = (state) => {
  const
    {
      totalCharges,
    } = state.quote.charges;
  const quote = state.quote;
  return {
    totalCharges,
    quote,
  };
};

const mapDispatchToProps = dispatch => ({
  onLoad: quote => dispatch(loadQuote(quote)),
  addChargeLine: chargeLine => dispatch(addChargeLine(chargeLine)),
  setChargeNotes: notes => dispatch(setChargeNotes(notes)),
  loadEmail: email => dispatch(loadEmail(email)),
  setFXConversionRate: (currency, rate) => dispatch(setFXConversionRate(currency, rate)),
  setQuoteCurrency: currency => dispatch(setQuoteCurrency(currency)),
});

const EditQuoteChargesConnect = connect(mapStateToProps, mapDispatchToProps)(EditQuoteCharges);

export default EditQuoteChargesConnect;

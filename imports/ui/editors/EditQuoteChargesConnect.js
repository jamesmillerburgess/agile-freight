import { connect } from 'react-redux';

import EditQuoteCharges from './EditQuoteCharges.jsx';
import { loadQuote, addChargeLine, setChargeNotes, setFXConversionRate } from '../../state/actions/newQuoteActions';
import { loadEmail } from '../../state/actions/emailActions';

const mapStateToProps = (state) => {
  const
    {
      totalOriginCharges,
      totalInternationalCharges,
      totalDestinationCharges,
      totalCharges,
      currency,
      notes,
    } = state.newQuote.charges;
  const { isOpen } = state.newQuote.email;
  const newQuote = state.newQuote;
  return {
    quote: state.newQuote,
    totalOriginCharges,
    totalInternationalCharges,
    totalDestinationCharges,
    totalCharges,
    currency,
    notes,
    newQuote,
    isOpen,
  };
};

const mapDispatchToProps = dispatch => ({
  onLoad: quote => dispatch(loadQuote(quote)),
  addChargeLine: chargeLine => dispatch(addChargeLine(chargeLine)),
  setChargeNotes: notes => dispatch(setChargeNotes(notes)),
  loadEmail: email => dispatch(loadEmail(email)),
  setFXConversionRate: (currency, rate) => dispatch(setFXConversionRate(currency, rate)),
});

const EditQuoteChargesConnect = connect(mapStateToProps, mapDispatchToProps)(EditQuoteCharges);

export default EditQuoteChargesConnect;

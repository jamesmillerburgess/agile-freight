import { connect } from 'react-redux';

import EditQuote from './EditQuote.jsx';
import { loadQuote, addChargeLine } from '../../state/actions/newQuoteActions';
import { loadEmail } from '../../state/actions/emailActions';

const mapStateToProps = (state) => {
  const
    {
      totalOriginCharges,
      totalInternationalCharges,
      totalDestinationCharges,
      totalCharges,
      currency,
    } = state.newQuote.charges;
  return {
    totalOriginCharges,
    totalInternationalCharges,
    totalDestinationCharges,
    totalCharges,
    currency,
  };
};

const mapDispatchToProps = dispatch => ({
  onLoad: quote => dispatch(loadQuote(quote)),
  addChargeLine: chargeLine => dispatch(addChargeLine(chargeLine)),
  loadEmail: email => dispatch(loadEmail(email)),
});

const EditQuoteConnect = connect(mapStateToProps, mapDispatchToProps)(EditQuote);

export default EditQuoteConnect;

import { connect } from 'react-redux';

import EditQuote from './EditQuote.jsx';
import { loadQuote } from '../../../state/actions/quoteActions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onLoad: quote => dispatch(newQuoteActions.loadQuote(quote)),
});

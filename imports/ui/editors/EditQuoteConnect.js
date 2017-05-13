import { connect } from 'react-redux';

import EditQuote from './EditQuote.jsx';
import { loadQuote } from '../../state/actions/newQuoteActions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onLoad: quote => dispatch(loadQuote(quote)),
});

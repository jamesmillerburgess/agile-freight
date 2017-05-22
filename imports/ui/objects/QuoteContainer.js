import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import { Quotes } from '../../api/quotes/quotesCollection';

import Quote from './Quote.jsx';

const QuoteContainer = createContainer((props) => {
  const quote = Quotes.findOne(props.quoteId);
  return { quote };
}, Quote);

QuoteContainer.propTypes = {
  quoteId: PropTypes.string.isRequired,
};

export default QuoteContainer;

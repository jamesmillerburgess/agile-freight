import PropTypes from 'prop-types';

export const quotePropTypes = PropTypes.shape({
  status: PropTypes.string,
  cargo: PropTypes.object,
  movement: PropTypes.object,
  charges: PropTypes.object,
  email: PropTypes.shape({
    to: PropTypes.string,
    cc: PropTypes.string,
    subject: PropTypes.string,
    message: PropTypes.string,
    sentDate: PropTypes.instanceOf(Date),
  }),
});

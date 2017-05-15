import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';

import EditQuoteChargeListConnect from './EditQuoteChargeListConnect';

import { currencyFormat } from '../formatters/numberFormatters';

const EditQuoteEmail = (props) => {
  const
    {
      setEmailIsOpen,
      to,
      setEmailTo,
      cc,
      setEmailCC,
      subject,
      setEmailSubject,
      message,
      setEmailMessage,
      charges,
    } = props;

  const sendEmail = () => {
    setEmailIsOpen(false);
    Meteor.call(
      'email.send',
      {
        from: 'agilityfreightdemo@gmail.com',
        to,
        cc,
        subject,
        message,
        quoteId: 'NSD9kRZWPtbTtprwA',
      },
    );
  };

  return (
    <div>
      <h1>Email Customer</h1>
      To: <input id="to" value={to} onChange={e => setEmailTo(e.target.value)} /><br />
      cc: <input id="cc" value={cc} onChange={e => setEmailCC(e.target.value)} /><br />
      Subject: <input id="subject" value={subject}
                      onChange={e => setEmailSubject(e.target.value)} /><br />
      Message: <textarea id="message" value={message}
                         onChange={e => setEmailMessage(e.target.value)} /><br />
      <button id="send-email-button" onClick={sendEmail}>
        Send Email
      </button>
      <div className="edit-group">
        <div className="edit-group-body">
          <table className="table table-bordered">
            <tbody>
              <tr className="title-row">
                <th colSpan="7" className="title">Origin Charges</th>
              </tr>
              <tr className="column-title-row">
                <th className="amount">Fee Code</th>
                <th>Fee Name</th>
                <th>Comment</th>
                <th className="amount">Units</th>
                <th className="amount">Unit Price</th>
                <th className="amount">Amount</th>
                <th className="amount">Final Amount</th>
              </tr>
            </tbody>
            <EditQuoteChargeListConnect group="Origin" readOnly />
            <tbody className="subtotal">
              <tr>
                <td colSpan="5" />
                <td>Subtotal</td>
                <td
                  id="origin-subtotal">{charges.currency} {currencyFormat(charges.totalOriginCharges)}</td>
              </tr>
            </tbody>
            <tbody>
              <tr className="empty-row" />
              <tr className="title-row">
                <th colSpan="7" className="title">International Charges</th>
              </tr>
              <tr className="column-title-row">
                <th>Fee Code</th>
                <th>Fee Name</th>
                <th>Comment</th>
                <th>Units</th>
                <th>Unit Price</th>
                <th>Amount</th>
                <th>Final Amount</th>
              </tr>
            </tbody>
            <EditQuoteChargeListConnect group="International" readOnly />
            <tbody className="subtotal">
              <tr>
                <td colSpan="5" />
                <td>Subtotal</td>
                <td
                  id="international-subtotal">{charges.currency} {currencyFormat(charges.totalInternationalCharges)}</td>
              </tr>
            </tbody>
            <tbody>
              <tr className="empty-row" />
              <tr className="title-row">
                <th colSpan="7" className="title">Destination Charges</th>
              </tr>
              <tr className="column-title-row">
                <th>Fee Code</th>
                <th>Fee Name</th>
                <th>Comment</th>
                <th>Units</th>
                <th>Unit Price</th>
                <th>Amount</th>
                <th>Final Amount</th>
              </tr>
            </tbody>
            <EditQuoteChargeListConnect group="Destination" readOnly />
            <tbody className="subtotal">
              <tr>
                <td colSpan="5" />
                <td>Subtotal</td>
                <td
                  id="destination-subtotal">{charges.currency} {currencyFormat(charges.totalDestinationCharges)}</td>
              </tr>
            </tbody>
            <tbody>
              <tr className="info-row">
                <td colSpan="5">
                  <textarea />
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="summary">
                <td colSpan="5">Summary</td>
                <td>Total Price</td>
                <td id="total">{charges.currency} {currencyFormat(charges.totalCharges)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

EditQuoteEmail.propTypes = {
  isOpen: PropTypes.bool,
  setEmailIsOpen: PropTypes.func,
  to: PropTypes.string,
  setEmailTo: PropTypes.func,
  cc: PropTypes.string,
  setEmailCC: PropTypes.func,
  subject: PropTypes.string,
  setEmailSubject: PropTypes.func,
  message: PropTypes.string,
  setEmailMessage: PropTypes.func,
  cargo: PropTypes.object,
  movement: PropTypes.object,
  otherServices: PropTypes.object,
  charges: PropTypes.object,
};

EditQuoteEmail.defaultProps = {
  setEmailIsOpen: () => null,
  to: '',
  setEmailTo: () => null,
  cc: '',
  setEmailCC: () => null,
  subject: '',
  setEmailSubject: () => null,
  message: '',
  setEmailMessage: () => null,
  charges: {
    chargeLines: [],
    currency: '',
    totalOriginCharges: 0,
    totalInternationalCharges: 0,
    totalDestinationCharges: 0,
    totalCharges: 0,
  },
};

export default EditQuoteEmail;

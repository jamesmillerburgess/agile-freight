import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

import EditQuoteChargeListConnect from './EditQuoteChargeListConnect';

import { currencyFormat } from '../formatters/numberFormatters';

const EditQuoteEmail = (props) => {
  console.log(ReactDOMServer.renderToStaticMarkup(<div></div>));
  const
    {
      isOpen,
      setEmailIsOpen,
      to,
      setEmailTo,
      cc,
      setEmailCC,
      subject,
      setEmailSubject,
      message,
      setEmailMessage,
      cargo,
      movement,
      otherServices,
      charges,
    } = props;
  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Modal"
    >
      <h1>Email Customer</h1>
      To: <input value={to} onChange={e => setEmailTo(e.target.value)} /><br />
      cc: <input value={cc} onChange={e => setEmailCC(e.target.value)} /><br />
      Subject: <input value={subject} onChange={e => setEmailSubject(e.target.value)} /><br />
      Message: <textarea value={message} onChange={e => setEmailMessage(e.target.value)} /><br />
      <button
        onClick={() =>
          Meteor.call(
            'email.send',
            {
              from: 'agilityfreightdemo@gmail.com',
              to,
              cc,
              subject,
              html: message,
            },
            () => setEmailIsOpen(false))}
      >
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
                <td>{charges.currency} {currencyFormat(charges.totalOriginCharges)}</td>
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
                <td>{charges.currency} {currencyFormat(charges.totalInternationalCharges)}</td>
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
                <td>{charges.currency} {currencyFormat(charges.totalDestinationCharges)}</td>
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
                <td>{charges.currency} {currencyFormat(charges.totalCharges)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </Modal>
  );
};

export default EditQuoteEmail;

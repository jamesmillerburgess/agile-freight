import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';

import EditQuoteChargeListConnect from './EditQuoteChargeListConnect';

import { Quotes } from '../../api/quotes/quotesCollection';

import { currencyFormat } from '../formatters/numberFormatters';
import { autoheight } from '../formatters/autoheight';

class EditQuoteEmail extends React.Component {
  constructor(props) {
    super(props);
    this.saveAndClose = this.saveAndClose.bind(this);
    this.archive      = this.archive.bind(this);
    this.sendEmail    = this.sendEmail.bind(this);
  }

  componentWillMount() {
    this.props.onLoad(Quotes.findOne(this.props.match.params.quoteId));
  }

  componentDidUpdate() {
    autoheight(this.messageNode);
  }

  saveAndClose() {
    Meteor.call(
      'quote.save',
      { ...this.props.quote, _id: this.props.match.params.quoteId },
      () => this.props.history.push(
        `/customers/${this.props.match.params.customerId}/overview`,
      ),
    );
  }

  archive() {

  }

  sendEmail() {
    Meteor.call(
      'email.send',
      {
        from: 'agilityfreightdemo@gmail.com',
        to: this.props.quote.email.to,
        cc: this.props.quote.email.cc,
        subject: this.props.quote.email.subject,
        message: this.props.quote.email.message,
        quoteId: this.props.match.params.quoteId,
      },
    );
  }

  render() {
    return (
      <div>
        <div className="process-header">
          <div className="title">NEW QUOTE</div>
          <div className="breadcrumbs">
            <div
              className="breadcrumb"
              onClick={() => this.props.history.push(`/customers/${this.props.match.params.customerId}/quotes/${this.props.match.params.quoteId}/header`)}
            >
              HEADER
            </div>
            <div className="breadcrumb-end" />
            <div className="breadcrumb-start" />
            <div
              className="breadcrumb"
              onClick={() => this.props.history.push(`/customers/${this.props.match.params.customerId}/quotes/${this.props.match.params.quoteId}/charges`)}
            >
              CHARGES
            </div>
            <div className="breadcrumb-end" />
            <div className="breadcrumb-start active customer" />
            <div className="breadcrumb active customer">EMAIL</div>
            <div className="breadcrumb-end active customer" />
          </div>
        </div>
        <div className="panel email">
          <div className="email-inputs">
            <div className="email-input">
              <span className="label">TO</span>
              <input id="to" value={this.props.quote.email.to}
                     onChange={e => this.props.setEmailTo(e.target.value)} />
            </div>
            <div className="email-input">
              <span className="label">CC</span>
              <input id="cc" value={this.props.quote.email.cc}
                     onChange={e => this.props.setEmailCC(e.target.value)} />
            </div>
            <div className="email-input">
              <span className="label">SUBJECT</span>
              <input id="subject" value={this.props.quote.email.subject}
                     onChange={e => this.props.setEmailSubject(e.target.value)} />
            </div>
            <div className="email-input">
              <span className="label">MESSAGE</span>
              <textarea
                ref={node => this.messageNode = node}
                id="message" value={this.props.quote.email.message}
                onChange={e => {
                  autoheight(this.messageNode);
                  this.props.setEmailMessage(e.target.value);
                }}
              />
            </div>
            <div className="form-button-group">
              <button className="delete-button" onClick={this.archive}>ARCHIVE</button>
              <button className="save-button" onClick={this.saveAndClose}>SAVE AND CLOSE</button>
              <button className="submit-button" onClick={this.sendEmail}>SEND EMAIL</button>
            </div>
          </div>
        </div>
        <div className="panel edit-quote">
          <table className="table">
            <tbody>
              <tr className="column-title-row">
                <th className="title charge-name-column">ORIGIN</th>
                <th className="rate-basis-column">RATE BASIS</th>
                <th className="units-column">UNITS</th>
                <th className="unit-price-column">UNIT PRICE</th>
                <th className="amount-local-column numeric-label">AMOUNT (LOCAL)</th>
                <th className="amount-final-column numeric-label">FINAL (USD)</th>
              </tr>
            </tbody>
            <EditQuoteChargeListConnect group="Origin" readOnly />
            <tbody className="subtotal">
              <tr>
                <td colSpan="4" />
                <td className="numeric-label">SUBTOTAL</td>
                <td className="numeric-label">
                  {this.props.quote.charges.currency} {currencyFormat(this.props.quote.charges.totalOriginCharges)}
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="empty-row" />
              <tr className="column-title-row">
                <th colSpan="6" className="title">INTERNATIONAL</th>
              </tr>
            </tbody>
            <EditQuoteChargeListConnect group="International" readOnly />
            <tbody className="subtotal">
              <tr>
                <td colSpan="4" />
                <td className="numeric-label">SUBTOTAL</td>
                <td className="numeric-label">
                  {this.props.quote.charges.currency} {currencyFormat(this.props.quote.charges.totalInternationalCharges)}
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="empty-row" />
              <tr className="column-title-row">
                <th colSpan="6" className="title">DESTINATION</th>
              </tr>
            </tbody>
            <EditQuoteChargeListConnect group="Destination" readOnly />
            <tbody className="subtotal">
              <tr>
                <td colSpan="4" />
                <td className="numeric-label">SUBTOTAL</td>
                <td className="numeric-label">
                  {this.props.quote.charges.currency} {currencyFormat(this.props.quote.charges.totalDestinationCharges)}
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="column-title-row">
                <td className="title">NOTES</td>
              </tr>
              <tr className="info-row">
                <td colSpan="6" className="notes-cell">
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" />
                <td className="numeric-label title">TOTAL PRICE</td>
                <td className="numeric-label title">
                  {this.props.quote.charges.currency} {currencyFormat(this.props.quote.charges.totalCharges)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}
;

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

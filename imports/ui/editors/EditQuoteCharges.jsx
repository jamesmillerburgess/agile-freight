import React from 'react';
import PropTypes from 'prop-types';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import EditQuoteChargeGroupConnect from './EditQuoteChargeGroupConnect';
import QuoteContainer from '../objects/QuoteContainer';
import CurrencyField from '../fields/CurrencyField.jsx';

import { Quotes } from '../../api/quotes/quotesCollection';
import { Customers } from '../../api/customers/customersCollection';

import { currencyFormat } from '../formatters/numberFormatters';
import { resizeHeight } from '../formatters/resizeHeight';

import { newChargeLine } from '../quoteUtils';

class EditQuoteCharges extends React.Component {
  constructor(props) {
    super(props);
    this.save            = this.save.bind(this);
    this.archive         = this.archive.bind(this);
    this.editEmail       = this.editEmail.bind(this);
    this.getFXRates      = this.getFXRates.bind(this);
  }

  componentWillMount() {
    this.props.onLoad(Quotes.findOne(this.props.match.params.quoteId));
  }

  componentDidUpdate() {
    resizeHeight(this.notesNode);
  }

  save() {
    Meteor.call('quote.save', {
      ...this.props.quote,
      _id: this.props.match.params.quoteId
    });
  }

  archive() {
    Meteor.call(
      'quote.archive',
      this.props.match.params.quoteId,
      () => this.props.history.push(
        `/customers/view/${this.props.match.params.customerId}/overview`,
      ),
    );
  }

  editEmail() {
    const to = Customers
      .findOne(this.props.match.params.customerId)
      .emailAddress;
    const email = {
      to,
      cc: '',
      subject: 'Your Freight Quote',
      message: `Dear customer,
      
    Thank you for your interest in our services. Please find attached a quote for the freight charges as per your request.`,
    };
    this.props.loadEmail(email);
    Meteor.call(
      'quote.save',
      { ...this.props.quote, email, _id: this.props.match.params.quoteId },
      () => this.props.history.push(
        `/customers/view/${this.props.match.params.customerId}/quotes/${this.props.match.params.quoteId}/email`,
      ),
    );
  }

  getFXRates() {
    return (
      <tbody>
        <tr>
          <td />
          <td className="title" colSpan="6">FX RATES</td>
        </tr>
        <tr>
          <td />
          <td>Quote Currency</td>
          <td>
            <CurrencyField
              value={this.props.quote.charges.currency}
              onChange={e => this.props.setQuoteCurrency(e.value)}
            />
          </td>
        </tr>
        {Object
          .keys(this.props.quote.charges.fxConversions)
          .map((currency, index) => {
            if (!this.props.quote.charges.fxConversions[currency].active) {
              return null;
            }
            return (
              <tr key={index}>
                <td />
                <td>
                  {this.props.quote.charges.currency}/{currency}
                </td>
                <td>
                  <input
                    type="number"
                    className="fx-rate"
                    value={this.props.quote.charges.fxConversions[currency].rate}
                    onChange={e => this.props.setFXConversionRate(currency, e.target.value)}
                  />
                </td>
              </tr>
            );
          })
        }
      </tbody>
    );
  }

  render() {
    const
      {
        addChargeLine,
        history,
      } = this.props;
    return (
      <div className="edit-quote">
        <div className="process-header">
          <div className="title">QUOTE {this.props.quote.reference}</div>
          <div className="breadcrumbs">
            <div
              className="breadcrumb"
              onClick={() => history.push(`/customers/view/${this.props.match.params.customerId}/quotes/${this.props.match.params.quoteId}/header`)}
            >
              HEADER
            </div>
            <div className="breadcrumb-end" />
            <div className="breadcrumb-start active customer" />
            <div className="breadcrumb active customer">CHARGES</div>
            <div className="breadcrumb-end active customer" />
          </div>
          <button
            className="button-primary"
            onClick={() => this.props.history.push(`/customers/view/${this.props.match.params.customerId}/overview`)}
          >
            BACK TO CUSTOMER
          </button>
        </div>
        <div className="">
          <div className="panel">
            <div className="table-wrapper">
              <table className="table">
                <tbody>
                  <tr className="column-title-row">
                    <th className="icon-cell">
                      <button
                        className="cargo-row-icon"
                        onClick={() => addChargeLine(newChargeLine('Origin', this.props.quote))}
                      >
                        <span className="fa fa-fw fa-plus-square" />
                      </button>
                    </th>
                    <th className="title charge-name-column">ORIGIN</th>
                    <th className="rate-basis-column">RATE BASIS</th>
                    <th className="units-column">UNITS</th>
                    <th className="unit-price-column numeric-label">UNIT PRICE</th>
                    <th className="amount-local-column numeric-label">AMOUNT (LOCAL)</th>
                    <th className="amount-final-column numeric-label">FINAL ({this.props.quote.charges.currency})</th>
                  </tr>
                </tbody>
                <EditQuoteChargeGroupConnect group="Origin" quote={this.props.quote} />
                <tbody>
                  <tr className="empty-row" />
                  <tr className="column-title-row">
                    <th className="icon-cell">
                      <button
                        className="cargo-row-icon"
                        onClick={() => addChargeLine(newChargeLine('International', this.props.quote))}
                      >
                        <span className="fa fa-fw fa-plus-square" />
                      </button>
                    </th>
                    <th colSpan="6" className="title">INTERNATIONAL</th>
                  </tr>
                </tbody>
                <EditQuoteChargeGroupConnect group="International" quote={this.props.quote} />
                <tbody>
                  <tr className="empty-row" />
                  <tr className="column-title-row">
                    <th className="icon-cell">
                      <button
                        className="cargo-row-icon"
                        onClick={() => addChargeLine(newChargeLine('Destination', this.props.quote))}
                      >
                        <span className="fa fa-fw fa-plus-square" />
                      </button>
                    </th>
                    <th colSpan="6" className="title">DESTINATION</th>
                  </tr>
                </tbody>
                <EditQuoteChargeGroupConnect group="Destination" quote={this.props.quote} />
                {this.getFXRates()}
                <tbody>
                  <tr className="column-title-row">
                    <td />
                    <td className="title">NOTES</td>
                  </tr>
                  <tr className="info-row">
                    <td />
                    <td colSpan="6" className="notes-cell">
                      <textarea
                        ref={node => this.notesNode = node}
                        value={this.props.quote.charges.notes}
                        onChange={e => {
                          resizeHeight(this.notesNode);
                          this.props.setChargeNotes(e.target.value);
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="5" />
                    <td className="numeric-label title">TOTAL PRICE</td>
                    <td className="numeric-label title">
                      {currencyFormat(this.props.quote.charges.totalCharges)} {this.props.quote.charges.currency}
                    </td>
                  </tr>
                </tfoot>
              </table>
              <div className="form-button-group">
                <button className="delete-button" onClick={this.archive}>ARCHIVE</button>
                <button className="save-button" onClick={this.save}>SAVE</button>
                <button className="button-submit" onClick={this.editEmail}>EDIT EMAIL</button>
              </div>
            </div>
          </div>
          <QuoteContainer quoteId={this.props.match.params.quoteId} />
        </div>
      </div>
    );
  }
}

EditQuoteCharges.propTypes = {
  onLoad: PropTypes.func.isRequired,
};

export default EditQuoteCharges;

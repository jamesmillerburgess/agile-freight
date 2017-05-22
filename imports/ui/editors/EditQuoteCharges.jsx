import React from 'react';
import PropTypes from 'prop-types';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import EditQuoteChargeGroupConnect from './EditQuoteChargeGroupConnect';
import Quote from '../objects/Quote.jsx';

import { Quotes } from '../../api/quotes/quotesCollection';
import { UNLocations } from '../../api/unlocations/unlocations-collection';

import { currencyFormat, weightFormat } from '../formatters/numberFormatters';
import { autoheight } from '../formatters/autoheight';

class EditQuoteCharges extends React.Component {
  constructor(props) {
    super(props);
    this.saveAndClose    = this.saveAndClose.bind(this);
    this.archive         = this.archive.bind(this);
    this.editEmail       = this.editEmail.bind(this);
    this.getMovementText = this.getMovementText.bind(this);
  }

  componentWillMount() {
    this.props.onLoad(Quotes.findOne(this.props.match.params.quoteId));
  }

  componentDidUpdate() {
    autoheight(this.notesNode);
  }

  getMovementText() {
    if (
      this.props.quote &&
      this.props.quote.movement &&
      this.props.quote.movement.pickup &&
      this.props.quote.movement.delivery &&
      this.props.quote.movement.pickup.location &&
      this.props.quote.movement.delivery.location
    ) {
      const pickupLocation   = UNLocations.findOne(new Mongo.ObjectID(this.props.quote.movement.pickup.location)).name;
      const deliveryLocation = UNLocations.findOne(new Mongo.ObjectID(this.props.quote.movement.delivery.location)).name;
      return `${pickupLocation} – ${deliveryLocation}`.toUpperCase();
    }
    return '';
  }

  saveAndClose() {
    Meteor.call(
      'quote.save',
      { ...this.props.newQuote, _id: this.props.match.params.quoteId },
      () => this.props.history.push(
        `/customers/${this.props.match.params.customerId}/overview`,
      ),
    );
  }

  archive() {
    Meteor.call(
      'quote.archive',
      this.props.match.params.quoteId,
      () => this.props.history.push(
        `/customers/${this.props.match.params.customerId}/overview`,
      ),
    );
  }

  editEmail() {
    const email = this.props.newQuote.email || {
        to: 'agilityfreightdemo@gmail.com',
        cc: '',
        subject: 'Your Freight Quote',
        message: `Dear customer,
    Thank you for your interest in our services. Please find attached a quote for the freight charges as per your request.`,
      };
    this.props.loadEmail(email);
    Meteor.call(
      'quote.save',
      { ...this.props.newQuote, email, _id: this.props.match.params.quoteId },
      () => this.props.history.push(
        `/customers/${this.props.match.params.customerId}/quotes/${this.props.match.params.quoteId}/email`,
      ),
    );
  }

  render() {
    const
      {
        quotes,
        totalOriginCharges,
        totalInternationalCharges,
        totalDestinationCharges,
        totalCharges,
        currency,
        addChargeLine,
        loadEmail,
        isOpen,
        history,
      } = this.props;
    return (
      <div className="edit-quote">
        <div className="process-header">
          <div className="title">NEW QUOTE</div>
          <div className="breadcrumbs">
            <div
              className="breadcrumb"
              onClick={() => history.push(`/customers/${this.props.match.params.customerId}/quotes/${this.props.match.params.quoteId}/header`)}
            >
              HEADER
            </div>
            <div className="breadcrumb-end" />
            <div className="breadcrumb-start active customer" />
            <div className="breadcrumb active customer">CHARGES</div>
            <div className="breadcrumb-end active customer" />
          </div>
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
                        onClick={() => addChargeLine({
                          id: new Mongo.ObjectID()._str,
                          group: 'Origin',
                        })}
                      >
                        <span className="fa fa-fw fa-plus-square" />
                      </button>
                    </th>
                    <th className="title charge-name-column">ORIGIN</th>
                    <th className="rate-basis-column">RATE BASIS</th>
                    <th className="units-column">UNITS</th>
                    <th className="unit-price-column numeric-label">UNIT PRICE</th>
                    <th className="amount-local-column numeric-label">AMOUNT (LOCAL)</th>
                    <th className="amount-final-column numeric-label">FINAL (USD)</th>
                  </tr>
                </tbody>
                <EditQuoteChargeGroupConnect group="Origin" />
                <tbody className="subtotal">
                  <tr>
                    <td colSpan="5" />
                    <td className="numeric-label">SUBTOTAL</td>
                    <td
                      className="numeric-label">{currency} {currencyFormat(totalOriginCharges)}</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr className="empty-row" />
                  <tr className="column-title-row">
                    <th className="icon-cell">
                      <button
                        className="cargo-row-icon"
                        onClick={() => addChargeLine({
                          id: new Mongo.ObjectID()._str,
                          group: 'International',
                        })}
                      >
                        <span className="fa fa-fw fa-plus-square" />
                      </button>
                    </th>
                    <th colSpan="6" className="title">INTERNATIONAL</th>
                  </tr>
                </tbody>
                <EditQuoteChargeGroupConnect group="International" />
                <tbody className="subtotal">
                  <tr>
                    <td colSpan="5" />
                    <td className="numeric-label">SUBTOTAL</td>
                    <td
                      className="numeric-label">{currency} {currencyFormat(totalInternationalCharges)}</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr className="empty-row" />
                  <tr className="column-title-row">
                    <th className="icon-cell">
                      <button
                        className="cargo-row-icon"
                        onClick={() => addChargeLine({
                          id: new Mongo.ObjectID()._str,
                          group: 'Destination',
                        })}
                      >
                        <span className="fa fa-fw fa-plus-square" />
                      </button>
                    </th>
                    <th colSpan="6" className="title">DESTINATION</th>
                  </tr>
                </tbody>
                <EditQuoteChargeGroupConnect group="Destination" />
                <tbody className="subtotal">
                  <tr>
                    <td colSpan="5" />
                    <td className="numeric-label">SUBTOTAL</td>
                    <td
                      className="numeric-label">{currency} {currencyFormat(totalDestinationCharges)}</td>
                  </tr>
                </tbody>
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
                        value={this.props.notes}
                        onChange={e => {
                          autoheight(this.notesNode);
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
                    <td
                      className="numeric-label title">{currency} {currencyFormat(totalCharges)}</td>
                  </tr>
                </tfoot>
              </table>
              <div className="form-button-group">
                <button className="delete-button" onClick={this.archive}>ARCHIVE</button>
                <button className="save-button" onClick={this.saveAndClose}>SAVE AND CLOSE</button>
                <button className="submit-button" onClick={this.editEmail}>EDIT EMAIL</button>
              </div>
            </div>
          </div>
          <Quote quote={this.props.quote} />
        </div>
      </div>
    );
  }
}

EditQuoteCharges.propTypes = {
  onLoad: PropTypes.func.isRequired,
};

export default EditQuoteCharges;

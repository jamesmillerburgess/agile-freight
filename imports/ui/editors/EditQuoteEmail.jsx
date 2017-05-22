import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import Quote from '../objects/Quote.jsx';

import { Quotes } from '../../api/quotes/quotesCollection';
import { UNLocations } from '../../api/unlocations/unlocations-collection';

import { autoheight } from '../formatters/autoheight';

class EditQuoteEmail extends React.Component {
  constructor(props) {
    super(props);
    this.saveAndClose    = this.saveAndClose.bind(this);
    this.archive         = this.archive.bind(this);
    this.sendEmail       = this.sendEmail.bind(this);
    this.getMovementText = this.getMovementText.bind(this);
  }

  componentWillMount() {
    this.props.onLoad(Quotes.findOne(this.props.match.params.quoteId));
  }

  componentDidUpdate() {
    autoheight(this.messageNode);
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
      { ...this.props.quote, _id: this.props.match.params.quoteId },
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

  sendEmail() {
    const email   = this.props.quote.email;
    const quoteId = this.props.match.params.quoteId;
    Meteor.call(
      'email.send',
      {
        from: 'agilityfreightdemo@gmail.com',
        ...email,
        quoteId,
      },
      () => Meteor.call('quote.submit', quoteId, email, moment().add(1, 'month').format()),
    );
    this.props.history.push(`/customers/${this.props.match.params.customerId}/overview`);
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
        <Quote quote={Quotes.findOne(this.props.match.params.quoteId)} />
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

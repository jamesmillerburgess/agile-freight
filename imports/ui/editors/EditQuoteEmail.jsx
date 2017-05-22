import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import QuoteContainer from '../objects/QuoteContainer';

import { Quotes } from '../../api/quotes/quotesCollection';
import { UNLocations } from '../../api/unlocations/unlocations-collection';

import { resizeHeight } from '../formatters/resizeHeight';
import { quotePropTypes } from '../objects/quotePropTypes';

class EditQuoteEmail extends React.Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.archive = this.archive.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.getMovementText = this.getMovementText.bind(this);
  }

  componentWillMount() {
    this.props.dispatchers.onLoad(Quotes.findOne(this.props.match.params.quoteId));
  }

  componentDidUpdate() {
    resizeHeight(this.messageNode);
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
      const pickupLocation =
        UNLocations.findOne(new Mongo.ObjectID(this.props.quote.movement.pickup.location)).name;
      const deliveryLocation =
        UNLocations.findOne(new Mongo.ObjectID(this.props.quote.movement.delivery.location)).name;
      return `${pickupLocation} – ${deliveryLocation}`.toUpperCase();
    }
    return '';
  }

  save() {
    Meteor.call('quote.save', { ...this.props.quote, _id: this.props.match.params.quoteId });
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
    const email = this.props.quote.email;
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
            <button
              className="breadcrumb"
              onClick={() => this.props.history.push(`/customers/${this.props.match.params.customerId}/quotes/${this.props.match.params.quoteId}/header`)}
            >
              HEADER
            </button>
            <div className="breadcrumb-end" />
            <div className="breadcrumb-start" />
            <button
              className="breadcrumb"
              onClick={() => this.props.history.push(`/customers/${this.props.match.params.customerId}/quotes/${this.props.match.params.quoteId}/charges`)}
            >
              CHARGES
            </button>
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
              <input
                id="to"
                value={this.props.quote.email.to}
                onChange={e => this.props.dispatchers.setEmailTo(e.target.value)}
              />
            </div>
            <div className="email-input">
              <span className="label">CC</span>
              <input
                id="cc"
                value={this.props.quote.email.cc}
                onChange={e => this.props.dispatchers.setEmailCC(e.target.value)}
              />
            </div>
            <div className="email-input">
              <span className="label">SUBJECT</span>
              <input
                id="subject"
                value={this.props.quote.email.subject}
                onChange={e => this.props.dispatchers.setEmailSubject(e.target.value)}
              />
            </div>
            <div className="email-input">
              <span className="label">MESSAGE</span>
              <textarea
                ref={(node) => {
                  this.messageNode = node;
                }}
                id="message"
                value={this.props.quote.email.message}
                onChange={(e) => {
                  resizeHeight(this.messageNode);
                  this.props.dispatchers.setEmailMessage(e.target.value);
                }}
              />
            </div>
            <div className="form-button-group">
              <button className="delete-button" onClick={this.archive}>ARCHIVE</button>
              <button className="save-button" onClick={this.save}>SAVE</button>
              <button className="submit-button" onClick={this.sendEmail}>SEND EMAIL</button>
            </div>
          </div>
        </div>
        <QuoteContainer quoteId={this.props.match.params.quoteId} />
      </div>
    );
  }
}

EditQuoteEmail.propTypes = {
  quote: quotePropTypes.isRequired,
  dispatchers: PropTypes.objectOf(PropTypes.func).isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default EditQuoteEmail;

import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';

import CheckboxField from '../fields/CheckboxField.jsx';

import QuoteContainer from '../objects/QuoteContainer';

import { quotePropTypes } from '../objects/quotePropTypes';


import Quote from '../quoteUtils';
import EditCargo from './EditCargo.jsx';
import EditMovement from './EditMovement.jsx';

import { Quotes } from '../../api/quotes/quotesCollection';

class EditQuoteHeader extends React.Component {
  constructor(props) {
    super(props);
    this.archive = this.archive.bind(this);
    this.save = this.save.bind(this);
    this.goToEditCharges = this.goToEditCharges.bind(this);
    this.saveQuote = this.saveQuote.bind(this);
    this.getRates = this.getRates.bind(this);
  }

  componentWillMount() {
    this.props.dispatchers.onLoad(Quotes.findOne(this.props.match.params.quoteId));
  }

  goToEditCharges() {
    this.props.history.push(
      `/customers/view/${this.props.match.params.customerId}/quotes/` +
      `${this.props.match.params.quoteId}/charges`,
    );
  }

  saveQuote(quote) {
    const quoteUpdate = {
      _id: this.props.match.params.quoteId,
      ...quote,
    };
    Meteor.call('quote.save', quoteUpdate, this.goToEditCharges);
  }

  getRates() {
    Quote.getAndApplyRates(this.props.quote, this.saveQuote);
  }

  save() {
    Meteor.call(
      'quote.save',
      { ...this.props.quote, _id: this.props.match.params.quoteId },
    );
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

  render() {
    return (
      <div className="new-quote">
        <div className="process-header">
          <div className="title">NEW QUOTE</div>
          <div className="breadcrumbs">
            <div className="breadcrumb active customer">HEADER</div>
            <div className="breadcrumb-end active customer" />
          </div>
          <button
            className="button-primary"
            onClick={() => this.props.history.push(`/customers/view/${this.props.match.params.customerId}/overview`)}
          >
            BACK TO CUSTOMER
          </button>
        </div>
        <div className="panel container form-section">
          <div className="title">
            <div className="cargo-row-icon" />
            CARGO
          </div>
          <EditCargo
            cargo={this.props.quote.cargo}
            dispatchers={this.props.dispatchers}
            useContainers={true}
            splitCargoTypes={true}
          />
        </div>
        <div className="panel container form-section">
          <div className="">
            <div className="title">
              <div className="cargo-row-icon" />
              MOVEMENT
            </div>
            <EditMovement
              movement={this.props.quote.movement}
              dispatchers={this.props.dispatchers}
              useDates={false}
            />
          </div>
        </div>
        <div className="panel container form-section">
          <div className="">
            <div className="pickup-delivery-wrapper">
              <div className="pickup">
                <div className="title">
                  <div className="cargo-row-icon" />
                  OTHER SERVICES
                </div>
                <div className="cargo-row-icon" />
                <CheckboxField
                  className="checkbox-temperature-controlled"
                  onClick={this.props.dispatchers.onClickExportCustomsClearance}
                  value={this.props.quote.otherServices.exportCustomsClearance}
                  label="EXPORT CUSTOMS CLEARANCE"
                />
                <CheckboxField
                  className="checkbox-temperature-controlled"
                  onClick={this.props.dispatchers.onClickImportCustomsClearance}
                  value={this.props.quote.otherServices.importCustomsClearance}
                  label="IMPORT CUSTOMS CLEARANCE"
                />
                <CheckboxField
                  className="checkbox-hazardous"
                  onClick={this.props.dispatchers.onClickInsurance}
                  value={this.props.quote.otherServices.insurance}
                  label="INSURANCE"
                />
              </div>
              <div className="form-button-group">
                <button className="delete-button" onClick={this.archive}>ARCHIVE</button>
                <button className="save-button" onClick={this.save}>SAVE</button>
                <button className="button-submit" onClick={this.getRates}>
                  EDIT CHARGES
                </button>
              </div>
            </div>
          </div>
        </div>
        <QuoteContainer quoteId={this.props.match.params.quoteId} />
      </div>
    );
  }
}

EditQuoteHeader.propTypes = {
  quote: quotePropTypes.isRequired,
  dispatchers: PropTypes.objectOf(PropTypes.func).isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line
                                        // react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line
                                      // react/forbid-prop-types
};

export default EditQuoteHeader;


import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { createContainer } from 'meteor/react-meteor-data';

import { Quotes } from '../../../api/quotes/quotes';

import TextareaField from '../../fields/TextareaField.jsx';
import FreeTextField from '../../fields/FreeTextField.jsx';
import DropdownField from '../../fields/DropdownField.jsx';
import { dateFormat } from '../../formatters/date-format';

const QuoteEditorInner = ({ quote }) => {
  const updateValue = (path, value) => Meteor.call('quote.updateField', quote._id, path, value);
  const addPackageLine = () => {
    // quote.cargo.packageLines.push({});
    // Meteor.call('quote.updateCargo', quote._id, quote.cargo);
    Meteor.call('quote.addPackageLine', quote._id);
  };
  const removePackageLine = (index) => {
    // quote.cargo.packageLines.splice(index, 1);
    // Meteor.call('quote.updateCargo', quote._id, quote.cargo);
    Meteor.call('quote.removePackageLine', quote._id, index);
  };
  const addChargeLine = () => {
    Meteor.call('quote.addChargeLine', quote._id);
  };
  return (
    <div className="quote-editor">
      <div className="document-editor">
        <div className="document-editor-inner">
          <img className="document-logo" src="/lib/dragon.png" alt="" />
          <div className="document-title">
            Freight Quotation
          </div>
          <div className="document-header">
            <div className="row no-gutters">
              <div className="col-4">
                <div className="label">
                  Customer
                </div>
                <TextareaField
                  value={quote.customerNameAddress}
                  path={'customerNameAddress'}
                  valueUpdateCallback={updateValue}
                />
              </div>
              <div className="col-4">
                <div className="label">
                  Reference
                </div>
                <b>{quote.quoteCode}</b>
                <div className="label">
                  Issued On
                </div>
                <b>{dateFormat(moment())}</b>
                <div className="label">
                  Valid Through
                </div>
                <b>{dateFormat(moment(quote.validThrough))}</b>
              </div>
            </div>
          </div>
          <div className="document-section">
            <h5>
              <DropdownField
                value={quote.mode}
                options={['Air', 'Ocean', 'Road', '']}
                path="mode"
                valueUpdateCallback={updateValue}
              />
              -
              <DropdownField
                value={quote.service}
                options={['Air', 'Ocean', 'Road', '']}
                path="service"
                valueUpdateCallback={updateValue}
              />
            </h5>
            <div className="row no-gutters">
              <div className="col-4 label">Description of Goods</div>
              <div className="col-8">
                <div className="row no-gutters">
                  <div className="col-1">
                    <button
                      className="add-row-button"
                      onClick={addPackageLine}
                    >
                      <i className="fa fa-fw fa-plus" />
                    </button>
                  </div>
                  <div className="col-2 label align-right">Packages&nbsp;&nbsp;</div>
                  <div className="col-3 label">Type</div>
                  <div className="col-3 label align-right">Gross Weight</div>
                  <div className="col-3 label align-right">Volume</div>
                </div>
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-4">
                <TextareaField
                  value={quote.cargo.descriptionOfGoods}
                  path={'cargo.descriptionOfGoods'}
                  valueUpdateCallback={updateValue}
                />
              </div>
              <div className="col-8">
                {
                  quote.cargo.packageLines.map((packageLine, index) => (
                    <div key={index} className="row no-gutters">
                      <div className="col-1">
                        <button
                          className="remove-row-button"
                          onClick={() => removePackageLine(index)}
                        >
                          <i className="fa fa-fw fa-minus" />
                        </button>
                      </div>
                      <div className="col-2 align-right extra-space">
                        <FreeTextField
                          alignRight
                          value={`${packageLine.num || ''}`}
                          path={`cargo.packageLines.${index}.num`}
                          valueUpdateCallback={updateValue}
                        />
                      </div>
                      <div className="col-3">
                        <DropdownField
                          value={`${packageLine.type || ''}`}
                          options={['Packages', 'Boxes', '']}
                          path={`cargo.packageLines.${index}.type`}
                          valueUpdateCallback={updateValue}
                        />
                      </div>
                      <div className="col-3 align-right">
                        <FreeTextField
                          alignRight
                          value={`${packageLine.grossWeight || ''}`}
                          path={`cargo.packageLines.${index}.grossWeight`}
                          unit="kg"
                          valueUpdateCallback={updateValue}
                        />
                      </div>
                      <div className="col-3 align-right">
                        <FreeTextField
                          alignRight
                          value={`${packageLine.volume || ''}`}
                          unit="cbm"
                          path={`cargo.packageLines.${index}.volume`}
                          valueUpdateCallback={updateValue}
                        />
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-4"><b>Totals</b></div>
              <div className="col-2 align-right extra-space"><b>{quote.cargo.totalPackages}</b>
              </div>
              <div className="col-2"><b>{quote.cargo.totalPackageType}</b></div>
              <div className="col-2 align-right"><b>{quote.cargo.totalGrossWeight} kg</b></div>
              <div className="col-2 align-right"><b>{quote.cargo.totalVolume} cbm</b></div>
            </div>
          </div>

          <div className="document-section">
            <h5>Charges</h5>
            <div className="row no-gutters">
              <div className="col-4 label">Description</div>
              <div className="col-8">
                <div className="row no-gutters">
                  <div className="col-1">
                    <button
                      className="add-row-button"
                      onClick={addChargeLine}
                    >
                      <i className="fa fa-fw fa-plus" />
                    </button>
                  </div>
                  <div className="col-2 label align-right">Rate&nbsp;&nbsp;</div>
                  <div className="col-3 label" />
                  <div className="col-3 label align-right">Units</div>
                  <div className="col-3 label align-right">Amount</div>
                </div>
              </div>
            </div>
            {
              quote.charges.chargeLines.map((chargeLine, index) =>
                <div key={index} className="row no-gutters">
                  <div className="col-4">
                    <FreeTextField
                      value={`${chargeLine.description || ''}`}
                      path={`charges.chargeLines.${index}.description`}
                      valueUpdateCallback={updateValue}
                    />
                  </div>
                  <div className="col-2 align-right extra-space">
                    <FreeTextField
                      alignRight
                      value={`${chargeLine.rate.amount || ''}`}
                      path={`charges.chargeLines.${index}.rate.amount`}
                      valueUpdateCallback={updateValue}
                    />
                  </div>
                  <div className="col-2">
                    <FreeTextField
                      value={`${chargeLine.rate.currency || ''}`}
                      path={`charges.chargeLines.${index}.rate.currency`}
                      valueUpdateCallback={updateValue}
                    /> /
                    <FreeTextField
                      value={`${chargeLine.rate.unit || ''}`}
                      path={`charges.chargeLines.${index}.rate.unit`}
                      valueUpdateCallback={updateValue}
                    />
                  </div>
                  <div className="col-2 align-right">
                    <FreeTextField
                      value={`${chargeLine.units || ''}`}
                      path={`charges.chargeLines.${index}.units`}
                      valueUpdateCallback={updateValue}
                    />
                    {chargeLine.rate.unit}
                  </div>
                  <div className="col-2 align-right">50.00 USD</div>
                </div>
              )
            }
            <div className="row no-gutters">
              <div className="col-4">Collection</div>
              <div className="col-2 align-right">10.00&nbsp;</div>
              <div className="col-2">USD / mile</div>
              <div className="col-2 align-right">5 miles</div>
              <div className="col-2 align-right">50.00 USD</div>
            </div>
            <div className="row no-gutters">
              <div className="col-4">International Freight</div>
              <div className="col-2 align-right">10.00&nbsp;</div>
              <div className="col-2">USD / kg</div>
              <div className="col-2 align-right">5 kg</div>
              <div className="col-2 align-right">50.00 USD</div>
            </div>
            <div className="row no-gutters">
              <div className="col-4">Delivery</div>
              <div className="col-2 align-right">10.00&nbsp;</div>
              <div className="col-2">USD / mile</div>
              <div className="col-2 align-right">5 miles</div>
              <div className="col-2 align-right">50.00 USD</div>
            </div>
          </div>
          <div className="document-section">
            <h5>Summary</h5>
            <div className="row no-gutters">
              <div className="col-8">
                <div className="row no-gutters">
                  <div className="col-3 label">Charge Group</div>
                  <div className="col-3 label align-right">Total</div>
                  <div className="col-3 label align-right">FX Rate</div>
                  <div className="col-3 label align-right">Total (INR)</div>
                </div>
                <div className="row no-gutters">
                  <div className="col-3">Origin</div>
                  <div className="col-3 align-right">50.00 USD</div>
                  <div className="col-3 align-right">66.413421</div>
                  <div className="col-3 align-right">3,320.66 INR</div>
                </div>
                <div className="row no-gutters">
                  <div className="col-3">International</div>
                  <div className="col-3 align-right">50.00 USD</div>
                  <div className="col-3 align-right">66.413421</div>
                  <div className="col-3 align-right">3,320.66 INR</div>
                </div>
                <div className="row no-gutters">
                  <div className="col-3">Destination</div>
                  <div className="col-3 align-right">50.00 USD</div>
                  <div className="col-3 align-right">66.413421</div>
                  <div className="col-3 align-right">3,320.66 INR</div>
                </div>
                <div className="row no-gutters">
                  <div className="col-6"><h3>Total Quoted Amount</h3></div>
                  <div className="col-6 align-right"><h3>9,961.97 INR</h3></div>
                </div>
              </div>
              <div className="col-1" />
              <div className="col-3">
                <div className="label">Agility Contact</div>
                James Burgess<br />
                Hyderabad, India<br />
                +41 79 417 8097<br />
                jburgess@agility.com
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="document-editor">
        <div className="document-editor-inner">
          <div className="document-section">
            <h5>Terms and Conditions</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

QuoteEditorInner.propTypes = {
  quote: PropTypes.object.isRequired,
};

const QuoteEditor = createContainer((props) => {
  const quoteId = props.match.params.quoteId;
  const quote = Quotes.findOne(quoteId);
  return {
    quote,
  };
}, QuoteEditorInner);

export default QuoteEditor;

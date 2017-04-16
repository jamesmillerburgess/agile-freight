import React from 'react';

const QuoteEditor = () => (
  <div className="document-editor">
    <div className="document-editor-inner">
      <img className="document-logo" src="/lib/dragon.png" />
      <div className="document-title">
        Freight Quotation
      </div>
      <div className="document-section">
        <div className="row no-gutters">
          <div className="col-4">
            <div className="label">
              Quote For
            </div>
            Alstom Power Boilers Limited<br />
            123 Jubilee Hills<br />
            Hyderabad, 129421<br />
            India
          </div>
          <div className="col-4">
            <div className="label">
              Reference
            </div>
            Q834501
            <div className="label">
              Issued On
            </div>
            15-Apr-2017
            <div className="label">
              Valid Through
            </div>
            15-Jun-2017
          </div>
        </div>
      </div>
      <div className="document-section">
        <div className="row no-gutters">
          <div className="col-3">
            <div className="label">
              Product and Service
            </div>
            Air Freight - Premier
          </div>
          <div className="col-3">
            <div className="label">
              Product and Service
            </div>
            Air Freight - Premier
          </div>
        </div>
      </div>
      <div className="document-section">
        <h5>Cargo</h5>
        <div className="row no-gutters">
          <div className="col-4 label">Description of Goods</div>
          <div className="col-2 label align-right">Packages&nbsp;&nbsp;</div>
          <div className="col-2 label">Type</div>
          <div className="col-2 label align-right">Gross Weight</div>
          <div className="col-2 label align-right">Volume</div>
        </div>
        <div className="row no-gutters">
          <div className="col-4">Pharmaceuticals</div>
          <div className="col-2 align-right">3&nbsp;</div>
          <div className="col-2">Boxes</div>
          <div className="col-2 align-right">350 kg</div>
          <div className="col-2 align-right">1.000 cbm</div>
        </div>
        <div className="row no-gutters">
          <div className="col-4"></div>
          <div className="col-2 align-right">5&nbsp;</div>
          <div className="col-2">Bags</div>
          <div className="col-2 align-right">200 kg</div>
          <div className="col-2 align-right">2.000 cbm</div>
        </div>
        <div className="row no-gutters">
          <div className="col-4"><b>Totals</b></div>
          <div className="col-2 align-right"><b>8&nbsp;</b></div>
          <div className="col-2"><b>Mixed Packages</b></div>
          <div className="col-2 align-right"><b>550 kg</b></div>
          <div className="col-2 align-right"><b>3.000 cbm</b></div>
        </div>
      </div>

      <div className="document-section">
        <h5>Charges</h5>
        <div className="row no-gutters">
          <div className="col-6 label"></div>
          <div className="col-2 label align-right">Rate</div>
          <div className="col-2 label align-right">Units</div>
          <div className="col-2 label align-right">Amount</div>
        </div>
        <div className="row no-gutters">
          <div className="col-6 label">Origin</div>
        </div>
        <div className="row no-gutters">
          <div className="col-6">Collection</div>
          <div className="col-2 align-right">10.00 USD / mile</div>
          <div className="col-2 align-right">5 miles</div>
          <div className="col-2 align-right">50.00 USD</div>
        </div>
        <div className="row no-gutters">
          <div className="col-10">&nbsp;</div>
        </div>
        <div className="row no-gutters">
          <div className="col-6 label">International</div>
        </div>
        <div className="row no-gutters">
          <div className="col-6">International Freight</div>
          <div className="col-2 align-right">10.00 USD / kg</div>
          <div className="col-2 align-right">5 kg</div>
          <div className="col-2 align-right">50.00 USD</div>
        </div>
        <div className="row no-gutters">
          <div className="col-10">&nbsp;</div>
        </div>
        <div className="row no-gutters">
          <div className="col-6 label">Destination</div>
        </div>
        <div className="row no-gutters">
          <div className="col-6">Delivery</div>
          <div className="col-2 align-right">10.00 USD / mile</div>
          <div className="col-2 align-right">5 miles</div>
          <div className="col-2 align-right">50.00 USD</div>
        </div>
        <div className="row no-gutters">
          <div className="col-10">&nbsp;</div>
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
      <div className="document-section">
        <h5>Terms and Conditions</h5>
      </div>
    </div>
  </div>
);

QuoteEditor.propTypes = {};

export default QuoteEditor;

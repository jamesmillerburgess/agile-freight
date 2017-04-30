import React from 'react';

const NewQuote = () => {
  return (
    <div className="new-quote">
      <div className="tab-bar">
        <div className="tab active">
          Loose Cargo
        </div>
        <div className="tab inactive">
          Containers
        </div>
      </div>
      <div className="edit-group with-tabs">
        <div className="edit-group-body">
          <div className="field">
            <div className="label">
              Package Type
            </div>
            <div className="select select-packages">
              Packages
              <i className="fa fa-fw fa-caret-down select-icon" />
            </div>
          </div>
          <div className="field">
            <div className="label">
              # Pkgs
            </div>
            <div className="select select-num-packages">
              1
              <i className="fa fa-fw fa-caret-down select-icon" />
            </div>
          </div>
          <div className="field">
            <div className="label">
              Dimensions / Pkg
            </div>
            <div className="input-group">
              <input className="input-group-first" placeholder="L" />
              <input className="input-group-middle" placeholder="W" />
              <input className="input-group-last" placeholder="H" />
            </div>
          </div>
          <div className="field">
            <div className="label">
              Weight / Pkg
            </div>
            <input className="select input-weight" placeholder="Weight" />
          </div>
          <div className="package-row-totals">
            <b>200</b> pkgs, <b>3</b> cbm, <b>200</b> kg
          </div>
          <div className="package-row-icon">
            <i className="fa fa-fw fa-plus-circle" />
          </div>
        </div>
        <div className="edit-group-footer">
          <div className="field checkbox-field">
            <div className="checkbox" />
            <div className="checkbox-label">Hazardous</div>
          </div>
          <div className="field checkbox-field">
            <div className="checkbox" />
            <div className="checkbox-label">Temperature Controlled</div>
          </div>
          <div className="edit-group-totals">
            <b>Total Shipment:</b> <b>200</b> pkgs, <b>3</b> cbm, <b>200</b> kg
          </div>
        </div>
      </div>
      <div className="edit-group">
        <div className="edit-group-body">
          <div className="pickup-delivery-wrapper">
            <div className="pickup">
              <div className="edit-group-title">
                Pickup From
              </div>
              <div className="field">
                <div className="label">
                  Location Type
                </div>
                <div className="select select-location-type">
                  Port/Airport
                  <i className="fa fa-fw fa-caret-down select-icon" />
                </div>
              </div>
              <div className="empty-field" />
              <div className="field">
                <div className="label">
                  Country
                </div>
                <div className="select select-country">
                  China
                  <i className="fa fa-fw fa-caret-down select-icon" />
                </div>
              </div>
              <div className="field">
                <div className="label">
                  City / Port Code
                </div>
                <div className="select select-country">
                  SHA
                  <i className="fa fa-fw fa-caret-down select-icon" />
                </div>
              </div>
            </div>
            <div className="delivery">
              <div className="edit-group-title">
                Delivery To
              </div>
              <div className="field">
                <div className="label">
                  Location Type
                </div>
                <div className="select select-location-type">
                  Business
                  <i className="fa fa-fw fa-caret-down select-icon" />
                </div>
              </div>
              <div className="empty-field" />
              <div className="field">
                <div className="label">
                  Country
                </div>
                <div className="select select-country">
                  United States
                  <i className="fa fa-fw fa-caret-down select-icon" />
                </div>
              </div>
              <div className="field">
                <div className="label">
                  Postal Code
                </div>
                <div className="select select-country">
                  34232
                  <i className="fa fa-fw fa-caret-down select-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="edit-group other-services">
        <div className="edit-group-body">
          <div className="pickup-delivery-wrapper">
            <div className="pickup">
              <div className="edit-group-title">Other Services</div>
              <div className="field">
                <div className="checkbox" />
                <div className="checkbox-label">Insurance</div>
              </div>
              <div className="field">
                <div className="checkbox" />
                <div className="checkbox-label">Customs Clearance</div>
              </div>
            </div>
            <div className="delivery">
              <button className="submit">GET RATES</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewQuote;

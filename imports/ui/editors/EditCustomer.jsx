import React from 'react';
import { Link } from 'react-router-dom';

const EditCustomer = () => (
  <div>
    <div className="content customer">
      <div className="process-header">
        <div className="title">NEW CUSTOMER</div>
        <Link to="/customers">
          <button className="button-primary">BACK TO CUSTOMER LIST</button>
        </Link>
      </div>
      <div className="panel">
        <div className="row">
          <div className="col">
            <div className="vertical-input-group">
              <span className="label">NAME</span>
              <input />
            </div>
            <div className="vertical-input-group">
              <span className="label">ADDRESS</span>
              <textarea className="address" />
            </div>
            <div className="vertical-input-group">
              <span className="label">CURRENCY</span>
              <input />
            </div>
            <div className="vertical-input-group">
              <span className="label">EMAIL ADDRESS</span>
              <input />
            </div>
          </div>
          <div className="col">
            <div className="vertical-input-group">
              <span className="label">BRANCH</span>
              <input />
            </div>
          </div>
        </div>
        <button className="button-submit">CREATE CUSTOMER</button>
      </div>
    </div>
    <div className="content-footer-accent customers-footer-accent" />
  </div>
);

export default EditCustomer;

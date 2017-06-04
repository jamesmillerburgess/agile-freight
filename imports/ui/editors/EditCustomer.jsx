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
        <div className="vertical-input-group">
          <span className="label">NAME</span>
          <input />
        </div>
      </div>
    </div>
    <div className="content-footer-accent customers-footer-accent" />
  </div>
);

export default EditCustomer;

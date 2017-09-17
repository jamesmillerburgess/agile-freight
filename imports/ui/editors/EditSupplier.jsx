import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import BranchField from '../fields/BranchField.jsx';
import CurrencyField from '../fields/CurrencyField.jsx';
import { Branches } from '../../api/branch/branchCollection';

const EditSupplier = props => (
  <div>
    <div className="content customer">
      <div className="process-header">
        <div className="title">
          {
            props.editMode ?
            'EDIT SUPPLIER' :
            'NEW SUPPLIER'
          }
        </div>
        <Link to="/customers">
          <button className="button-primary">BACK TO SUPPLIER LIST</button>
        </Link>
      </div>
      <div className="panel container">
        <div className="row">
          <div className="col">
            <div className="vertical-input-group">
              <span className="label">BRANCH</span>
              <BranchField
                value={props.supplier.branch}
                options={Branches.find().fetch()}
                onChange={value => props.dispatchers.setBranch(value._id)}
              />
            </div>
            <div className="vertical-input-group">
              <span className="label">NAME</span>
              <input
                value={props.supplier.name}
                onChange={e => props.dispatchers.setName(e.target.value)}
              />
            </div>
            <div className="vertical-input-group">
              <span className="label">ADDRESS</span>
              <textarea
                className="address"
                value={props.supplier.address}
                onChange={e => props.dispatchers.setAddress(e.target.value)}
              />
            </div>
            <div className="vertical-input-group">
              <span className="label">EMAIL ADDRESS</span>
              <input
                value={props.supplier.emailAddress}
                onChange={e => props.dispatchers.setEmailAddress(e.target.value)}
              />
            </div>
            <div className="vertical-input-group">
              <span className="label">CURRENCY</span>
              <CurrencyField
                value={props.supplier.currency}
                onChange={e => props.dispatchers.setCurrency(e.value)}
              />
            </div>
          </div>
        </div>
        <button
          className="button-submit"
          onClick={() => {
            if (props.editMode) {
              const { supplierId } = props.match.params;
              Meteor.call('supplier.save', supplierId, props.supplier, () => {
                props.history.push('/suppliers');
              });
            } else {
              Meteor.call('supplier.new', props.supplier, () => {
                props.history.push('/suppliers');
              });
            }
          }}
        >
          SAVE CUSTOMER
        </button>
      </div>
    </div>
    <div className="content-footer-accent customers-footer-accent" />
  </div>
);

export default EditSupplier;

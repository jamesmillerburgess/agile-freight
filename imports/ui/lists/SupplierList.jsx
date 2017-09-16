import React from 'react';
import BranchField from '../fields/BranchField.jsx';

const SupplierList = (props) =>
  <div>
    <div className="content supplier">
      <div className="process-header">
        <div className="title">SUPPLIER LIST</div>
        <div className="horizontal-input-group">
          <div className="label">BRANCH</div>
          <div className="field">
            <BranchField
              // value={supplierList.filter}
              // options={Branches.find().fetch()}
              // onChange={option => dispatchers.setCustomerListFilter(option._id)}
            />
          </div>
        </div>
        <button
          className="button-primary"
          // onClick={newCustomer}
        >
          NEW SUPPLIER
        </button>
      </div>
      {
        // suppliers
        //   .filter(customer => customer.branch === customerList.filter)
        //   .sort((a, b) => compareSuppliers(a, b, Meteor.user()))
        //   .map(customer => (
        //     <SupplierListItem
        //       key={supplier._id}
        //       supplier={supplier}
        //       history={history}
        //     />
        //   ))
      }
    </div>
    <div className="content-footer-accent suppliers-footer-accent" />
  </div>;

export default SupplierList;

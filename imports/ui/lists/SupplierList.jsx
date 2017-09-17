import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import BranchField from '../fields/BranchField.jsx';
import SupplierListItem from '../list-items/SupplierListItem.jsx';
import { Suppliers } from '../../api/suppliers/supplierCollection';

const SupplierListInner = ({ suppliers, history }) => {
  const newSupplier = () => {
    history.push('/suppliers/new');
  };
  return (
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
          <button className="button-primary" onClick={newSupplier}>
            NEW SUPPLIER
          </button>
        </div>
        {suppliers
          // .filter(supplier => supplier.branch === supplierList.filter)
          .reverse()
          .map(supplier =>
            <SupplierListItem
              key={supplier._id}
              supplier={supplier}
              history={history}
            />,
          )}
      </div>
      <div className="content-footer-accent suppliers-footer-accent" />
    </div>
  );
};

const SupplierList = createContainer(
  () => ({
    suppliers: Suppliers.find().fetch(),
  }),
  SupplierListInner,
);

export default SupplierList;

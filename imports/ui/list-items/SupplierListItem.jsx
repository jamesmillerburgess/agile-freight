import React from 'react';
import { Link } from 'react-router-dom';

const SupplierListItem = ({ supplier }) =>
  <Link
    to={`/suppliers/view/${supplier._id}/overview`}
    className="list-item panel"
  >
    <div className="title">
      {supplier.name}
    </div>
  </Link>;

export default SupplierListItem;

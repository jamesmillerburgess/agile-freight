import React from 'react';
import { Link } from 'react-router-dom';

const SupplierListItem = ({ supplier }) =>
  <Link
    to={`/suppliers/edit/${supplier._id}`}
    className="list-item panel"
  >
    <div className="title">
      {supplier.name}
    </div>
  </Link>;

export default SupplierListItem;

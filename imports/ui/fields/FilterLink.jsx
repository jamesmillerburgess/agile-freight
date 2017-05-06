import React from 'react';
import { Link } from 'react-router-dom';

const FilterLink = ({ filter, children }) => (
  <Link
    to={filter}
    activeStyle={{
      textDecoration: 'none',
      color: 'black',
    }}
  >
    {children}
  </Link>
);

export default FilterLink;

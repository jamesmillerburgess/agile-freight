import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import { Customers } from '../../api/customers/customers';

import CustomerListItem from '../list-items/CustomerListItem.jsx';

class CustomerList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { customers } = this.props;
    return (
      <div className="customer-list">
        <div className="panel">
          <div className="panel-header">
            <div className="panel-header-inner">
              <div className="icon-container hidden-md-down">
                <i className="icon fa fa-fw fa-address-card" />
              </div>
              <div className="panel-header-content container">
                <div className="row">
                  <div className="panel-title col-2">
                    Customers
                  </div>
                  <div className="col-5">
                    <ul className="nav">
                      <li className="nav-item">
                        <a className="nav-link active" href="#">Mine</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">New</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Top</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-5">
                    <form className="form-inline">
                      <input className="focis-input mr-sm-2" type="text" placeholder="Filter" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {customers.map(customer => <CustomerListItem key={customer._id} customer={customer} />)}
      </div>
    );
  }
}

CustomerList.propTypes = {
  loading: PropTypes.bool,
  customers: PropTypes.array,
};

const CustomerListContainer = createContainer(() => {
  return {
    customers: Customers.find().fetch(),
  };
}, CustomerList);

export default CustomerListContainer;

import React, { Component } from 'react';

import CustomerListItem from '../list-items/CustomerListItem.jsx';

export default class CustomerList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loading } = this.props;
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
        {loading
          ? <h1>Loading...</h1>
          : this.props.customers.map((customer, index) => <CustomerListItem key={index} customer={customer} />)
        }
      </div>
    );
  }
}

CustomerList.propTypes = {
  loading: React.PropTypes.bool,
  customers: React.PropTypes.array,
};

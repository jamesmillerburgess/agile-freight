import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Bar, Line } from 'react-chartjs';

import MentionFieldContainer from '../fields/MentionField.jsx';

import { Customers } from '../../api/customers/customers';
import { Quotes } from '../../api/quotes/quotes';
import { Jobs } from '../../api/jobs/jobs';


class Customer extends Component {
  constructor(props) {
    super(props);
    this.getChartWidth = this.getChartWidth.bind(this);
  }

  creditUsageStyle() {
    return {
      width: `${Math.round((this.props.customer.credit.used / this.props.customer.credit.total) * 100)}%`,
      height: '20px',
    };
  }

  getChartWidth() {
    console.log(this.chartNode);
    return this.chartNode.width();
  }

  render() {
    const { loading, customer } = this.props;
    return (
      <div>
        <div>
          <div className="row page-header">
            <div className="page-header-inner">
              {loading ? '...' : customer.name}
            </div>
          </div>
          <div className="row">
            <div className="col-2 sidebar">
              <div className="sidebar-section-header">
                VIEWS
              </div>
              <NavLink
                to={`/customer/${loading ? '...' : customer._id}/overview`}
                activeClassName="active"
              >
                Overview
              </NavLink>
              <NavLink
                to={`/customer/${loading ? '...' : customer._id}/quotes`}
                activeClassName="active"
              >
                Quotes
              </NavLink>
              <NavLink
                to={`/customer/${loading ? '...' : customer._id}/cargo`}
                activeClassName="active"
              >
                Cargo
              </NavLink>
              <NavLink
                to={`/customer/${loading ? '...' : customer._id}/accounting`}
                activeClassName="active"
              >
                Accounting
              </NavLink>
              <NavLink
                to={`/customer/${loading ? '...' : customer._id}/configuration`}
                activeClassName="active"
              >
                Configuration
              </NavLink>
              <div className="sidebar-section-spacer" />
              <div className="sidebar-section-header">
                UPDATES
              </div>
              {/*<MentionFieldContainer />*/}
            </div>
            <div className="col-10 content">
              <div className="row">
                <div className="col-4 kpi">
                  <div className="kpi-label">
                    Quote Win Rate
                  </div>
                  <div className="kpi-value">
                    25%
                  </div>
                </div>
                <div className="col-4 kpi">
                  <div className="kpi-label">
                    Net Revenue
                  </div>
                  <div className="kpi-value">
                    382,128 INR
                  </div>
                </div>
                <div className="col-4 kpi">
                  <div className="kpi-label">
                    Customer Rank
                  </div>
                  <div className="kpi-value">
                    12
                  </div>
                </div>
              </div>
              <div className="chart">
                <div className="chart-label">
                  Cargo Volume
                </div>
                <Bar
                  data={{
                    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
                    datasets: [{
                      label: '# of Votes',
                      data: [12, 19, 3, 5, 2, 3, 5, 9, 6, 7, 1, 3],
                      backgroundColor: [
                        'rgba(255,255,255,1)',
                      ],
                      borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                      ],
                      borderWidth: 1,
                    }],
                  }}
                  options={{ responsive: true }}
                  width="900"
                />
              </div>
              <div className="chart">
                <div className="chart-label">
                  Credit Usage
                </div>
                <Line
                  data={{
                    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
                    datasets: [{
                      data: [0.2, 0.25, 0.4, 0.2, 0.18, 0.3, 0.36, 0.5, 0.45, 0.61, 0.54, 0.48],
                      backgroundColor: [
                        'rgba(255,255,255,1)',
                      ],
                      borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                      ],
                      borderWidth: 1,
                    }, {
                      data: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.7, 0.7, 0.7],
                      fillColor: [
                        'rgba(220,200,200,0.2)',
                      ],
                      borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                      ],
                      borderWidth: 1,
                    }],
                  }}
                  options={{ responsive: true }}
                  width="900"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Customer.propTypes = {
  loading: React.PropTypes.bool,
  customer: React.PropTypes.object,
  quotes: React.PropTypes.array,
  jobs: React.PropTypes.array,
};

const CustomerContainer = createContainer((props) => {
  const branch = Meteor.subscribe('branch.active');
  const loading = !branch.ready();
  const customerId = props.match.params.id;
  return {
    loading,
    customer: Customers.findOne(customerId),
    quotes: Quotes.find({ 'customer.id': customerId }).fetch(),
    jobs: Jobs.find({ $or: [{ shipper: customerId }, { consignee: customerId }] }).fetch(),
  };
}, Customer);

export default CustomerContainer;

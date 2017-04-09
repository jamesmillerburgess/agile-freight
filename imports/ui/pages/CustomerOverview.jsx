import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Bar, Line } from 'react-chartjs';

class CustomerOverviewInner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loading, customer } = this.props;
    return (
      <div className="customer-overview">
        <div className="row">
          <div className="col-3 kpi">
            <div className="kpi-label">
              Quote Win Rate
            </div>
            <div className="kpi-value">
              25%
            </div>
          </div>
          <div className="col-6 kpi">
            <div className="kpi-label">
              Net Revenue
            </div>
            <div className="kpi-value">
              382,128 INR (4%)
            </div>
          </div>
          <div className="col-3 kpi">
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
    );
  }
}

CustomerOverviewInner.propTypes = {
  loading: PropTypes.bool,
  customer: PropTypes.object,
};

const CustomerOverview = createContainer((props) => {
  const branch = Meteor.subscribe('branch.active');
  const loading = !branch.ready();
  const { customer } = props;
  return {
    loading,
    customer,
  };
}, CustomerOverviewInner);

export default CustomerOverview;

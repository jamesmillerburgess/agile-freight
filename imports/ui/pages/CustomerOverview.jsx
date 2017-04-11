import { Meteor } from 'meteor/meteor';
import React from 'react';
import { NavLink, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Bar } from 'react-chartjs-2';

class CustomerOverviewInner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { customer } = this.props;
    return (
      <div className="customer-overview">
        <div className="content-navbar">
          <NavLink to={`/customer/${customer._id}/overview/ltm`}>
            Last 12 Months
          </NavLink>
          <NavLink to={`/customer/${customer._id}/overview/ytd`}>
            Year to Date
          </NavLink>
          <NavLink to={`/customer/${customer._id}/overview/all-time`}>
            All Time
          </NavLink>
          <NavLink to={`/customer/${customer._id}/overview/custom`}>
            Custom
          </NavLink>
        </div>
        <div className="content-body">
          <Route path={`/customer/${customer._id}/overview`} exact>
            <Redirect to={`/customer/${customer._id}/overview/ltm`}/>
          </Route>
          <div className="row">
            <div className="col-3 kpi">
              <div className="kpi-label">
                Customer Rank
              </div>
              <div className="kpi-value">
                12
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
                Quote Win Rate
              </div>
              <div className="kpi-value">
                25%
              </div>
            </div>
          </div>
          <div className="chart">
            <div className="chart-label">
              Cargo Volume
            </div>
            <div className="chart-container">
              <Bar
                data={{
                  labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
                  datasets: [{
                    data: [12, 19, 3, 5, 2, 3, 5, 9, 6, 7, 1, 3],
                    borderWidth: 1,
                  }],
                }}
                height={150}
                options={{
                  maintainAspectRatio: false,
                  legend: { display: false },
                }}
              />
            </div>
          </div>
          <div className="chart">
            <div className="chart-label">
              Credit Usage
            </div>

          </div>
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

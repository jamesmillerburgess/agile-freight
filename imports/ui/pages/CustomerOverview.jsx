import React from 'react';
import { NavLink, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Bar, Line } from 'react-chartjs-2';
import moment from 'moment';

import { Quotes } from '../../api/quotes/quotes';
import { Shipments } from '../../api/shipments/shipments';
import { ltmStart, ytdStart, allTimeStart } from '../calculations';

class CustomerOverviewInner extends React.Component {
  render() {
    const { customer, kpis } = this.props;
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
            <Redirect to={`/customer/${customer._id}/overview/ltm`} />
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
                <Route
                  path={`/customer/${customer._id}/overview/ltm`}
                  render={() => <div>{kpis.ltm.netRevenue.toLocaleString()} INR (4%)</div>}
                />
                <Route
                  path={`/customer/${customer._id}/overview/ytd`}
                  render={() => <div>{kpis.ytd.netRevenue.toLocaleString()} INR (4%)</div>}
                />
                <Route
                  path={`/customer/${customer._id}/overview/all-time`}
                  render={() => <div>{kpis.allTime.netRevenue.toLocaleString()} INR (4%)</div>}
                />

              </div>
            </div>
            <div className="col-3 kpi">
              <div className="kpi-label">
                Quote Win Rate
              </div>
              <div className="kpi-value">
                <Route
                  path={`/customer/${customer._id}/overview/ltm`}
                  render={() => <div>{kpis.ltm.quoteWinRate}%</div>}
                />
                <Route
                  path={`/customer/${customer._id}/overview/ytd`}
                  render={() => <div>{kpis.ytd.quoteWinRate}%</div>}
                />
                <Route
                  path={`/customer/${customer._id}/overview/all-time`}
                  render={() => <div>{kpis.allTime.quoteWinRate}%</div>}
                />
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
                  labels: [
                    'Apr \'16',
                    'May \'16',
                    'Jun \'16',
                    'Jul \'16',
                    'Aug \'16',
                    'Sep \'16',
                    'Oct \'16',
                    'Nov \'16',
                    'Dec \'16',
                    'Jan \'17',
                    'Feb \'17',
                    'Mar \'17',
                    'Apr \'17',
                  ],
                  datasets: [{
                    backgroundColor: [
                      'rgba(0,0,0,0.1)',
                      'rgba(0,0,0,0.1)',
                      'rgba(0,0,0,0.1)',
                      'rgba(0,0,0,0.1)',
                      'rgba(0,0,0,0.1)',
                      'rgba(0,0,0,0.1)',
                      'rgba(0,0,0,0.1)',
                      'rgba(0,0,0,0.1)',
                      'rgba(0,0,0,0.1)',
                      'rgba(0,0,0,0.1)',
                      'rgba(0,0,0,0.1)',
                      'rgba(0,0,0,0.1)',
                      'rgba(0,0,0,0.3)',
                    ],
                    data: kpis.ltm.netRevenueData,
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
            <div className="chart-container">
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
                height={150}
                options={{
                  maintainAspectRatio: false,
                  legend: { display: false },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
      ;
  }
}

CustomerOverviewInner.propTypes = {
  customer: PropTypes.object,
  kpis: PropTypes.object,
  ltmNetRevenue: PropTypes.number,
  ytdNetRevenue: PropTypes.number,
  allTimeNetRevenue: PropTypes.number,
  ltmQuoteWinRate: PropTypes.number,
  ytdQuoteWinRate: PropTypes.number,
  allTimeQuoteWinRate: PropTypes.number,
};

const CustomerOverview = createContainer((props) => {
  const { customer } = props;

  const getNetRevenue = (cus, start) =>
    cus.shipments
      .reduce((acc, val) => {
        const shipment = Shipments.findOne(val);
        if (moment(shipment.creationDate).isAfter(start())) {
          return acc + shipment.shipperNetRevenue;
        }
        return acc;
      }, 0);

  const getQuoteWinRate = (cus, start) => {
    const expiredQuotes = Quotes
      .find({ _id: { $in: cus.quotes } })
      .fetch()
      .filter(quote =>
      quote.status === 'Expired' &&
      moment(quote.expiryDate)
        .isAfter(start()));
    const wonQuotes = expiredQuotes
      .filter(quote =>
        quote.shipments.length !== 0,
      );
    return expiredQuotes.length > 0 ?
      Math.floor((wonQuotes.length / expiredQuotes.length) * 100) : 0;
  };

  const buildVolumeData = (arr, valPath, datePath, start) => {
    const firstOfNextMonth = moment().subtract(moment().date(), 'days').add(1, 'months');
    const volumeData = [];
    const m = start();
    while (new Date(m) < new Date()) {
      m.add(1, 'months');
      volumeData.push(0);
    }
    arr.forEach((val) => {
      if (moment(val[datePath]).isAfter(start())) {
        volumeData[firstOfNextMonth.diff(moment(val[datePath]), 'months')] += val[valPath];
      }
    });
    return volumeData.reverse();
  };

  const kpis = {
    ltm: {
      netRevenue: getNetRevenue(customer, ltmStart),
      quoteWinRate: getQuoteWinRate(customer, ltmStart),
      netRevenueData: buildVolumeData(Shipments.find({ _id: { $in: customer.shipments } }).fetch(), 'shipperNetRevenue', 'creationDate', ltmStart),
    },
    ytd: {
      netRevenue: getNetRevenue(customer, ytdStart),
      quoteWinRate: getQuoteWinRate(customer, ytdStart),
    },
    allTime: {
      netRevenue: getNetRevenue(customer, allTimeStart),
      quoteWinRate: getQuoteWinRate(customer, allTimeStart),
    },
  };

  return {
    customer,
    kpis,
  };
}, CustomerOverviewInner);

export default CustomerOverview;

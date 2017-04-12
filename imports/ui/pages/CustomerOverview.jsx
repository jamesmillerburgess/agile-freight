import React from 'react';
import { NavLink, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';

import { Quotes } from '../../api/quotes/quotes';
import { Shipments } from '../../api/shipments/shipments';
import { ltmStart, ytdStart, allTimeStart } from '../calculations';

class CustomerOverviewInner extends React.Component {
  constructor(props) {
    super(props);
    this.getKpis = this.getKpis.bind(this);
  }

  getKpis() {
    const pathname = this.props.location.pathname;
    const kpis = this.props.kpis;
    if (pathname.indexOf('/overview/ytd') !== -1) {
      return kpis.ytd;
    }
    if (pathname.indexOf('/overview/ltm') !== -1) {
      return kpis.ltm;
    }
    if (pathname.indexOf('/overview/all-time') !== -1) {
      return kpis.allTime;
    }
    return kpis.ytd;
  }

  render() {
    const { customer } = this.props;
    const getKpis = this.getKpis;
    return (
      <div className="customer-overview">
        <div className="content-navbar">
          <NavLink to={`/customer/${customer._id}/overview/ytd`}>
            Year to Date
          </NavLink>
          <NavLink to={`/customer/${customer._id}/overview/ltm`}>
            Last 12 Months
          </NavLink>
          <NavLink to={`/customer/${customer._id}/overview/all-time`}>
            All Time
          </NavLink>
        </div>
        <div className="content-body">
          <Route path={`/customer/${customer._id}/overview`} exact>
            <Redirect to={`/customer/${customer._id}/overview/ytd`} />
          </Route>
          <div className="row">
            <div className="col-3 kpi">
              <div className="kpi-label">
                Quote Win Rate
              </div>
              <div className="kpi-value">
                {getKpis().quoteWinRate}%
              </div>
            </div>
            <div className="col-6 kpi">
              <div className="kpi-label">
                Net Revenue
              </div>
              <div className="kpi-value">
                <div>{getKpis().netRevenue.toLocaleString()} INR (4%)</div>
              </div>
            </div>
            <div className="col-3 kpi">
              <div className="kpi-label">
                Credit Usage
              </div>
              <div className="kpi-value">
                {Math.floor((customer.credit.used / customer.credit.total) * 100)}%
              </div>
            </div>
          </div>
          <div className="chart">
            <div className="chart-label">
              Net Revenue by Month
            </div>
            <div className="chart-container">
              <Bar
                data={{
                  labels: getKpis().labels,
                  datasets: [{
                    data: getKpis().netRevenueData,
                    borderWidth: 1,
                  }],
                }}
                height={150}
                options={{
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          callback: label => (+label).toLocaleString(),
                        },
                      },
                    ],
                  },
                  maintainAspectRatio: false,
                  legend: { display: false },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CustomerOverviewInner.propTypes = {
  customer: PropTypes.object,
  kpis: PropTypes.object,
};

const CustomerOverview = createContainer((props) => {
  const { customer } = props;
  const quotes = Quotes.find({ _id: { $in: customer.quotes } }).fetch();
  const shipments = Shipments.find({ _id: { $in: customer.shipments } }).fetch();

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
    const expiredQuotes = quotes
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
    const now = moment();
    while (start < now) {
      now.subtract(1, 'months');
      volumeData.push(0);
    }
    arr.forEach((val) => {
      if (moment(val[datePath]).isAfter(moment(start))) {
        volumeData[firstOfNextMonth.diff(moment(val[datePath]), 'months')] += val[valPath];
      }
    });
    return volumeData.reverse();
  };

  const getDataLabels = (start) => {
    const dataLabels = [];
    const m = start;
    const now = moment();
    while (m < now) {
      m.add(1, 'months');
      dataLabels.push(`${m.format('MMM')} '${m.format('YY')}`);
    }
    return dataLabels;
  };

  const minDate = moment(_.min(shipments, val => moment(val.creationDate)).creationDate);
  const ats = minDate.subtract(minDate.date(), 'days');

  const kpis = {
    ltm: {
      netRevenue: getNetRevenue(customer, ltmStart),
      quoteWinRate: getQuoteWinRate(customer, ltmStart),
      netRevenueData: buildVolumeData(shipments, 'shipperNetRevenue', 'creationDate', ltmStart()),
      labels: getDataLabels(ltmStart()),
    },
    ytd: {
      netRevenue: getNetRevenue(customer, ytdStart),
      quoteWinRate: getQuoteWinRate(customer, ytdStart),
      netRevenueData: buildVolumeData(shipments, 'shipperNetRevenue', 'creationDate', ytdStart()),
      labels: getDataLabels(ytdStart()),
    },
    allTime: {
      netRevenue: getNetRevenue(customer, allTimeStart),
      quoteWinRate: getQuoteWinRate(customer, allTimeStart),
      netRevenueData: buildVolumeData(shipments, 'shipperNetRevenue', 'creationDate', ats),
      labels: getDataLabels(ats),
    },
  };

  return {
    customer,
    kpis,
  };
}, CustomerOverviewInner);

export default CustomerOverview;

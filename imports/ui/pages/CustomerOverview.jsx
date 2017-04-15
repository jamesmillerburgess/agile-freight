import React from 'react';
import { NavLink, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';

import { Quotes } from '../../api/quotes/quotes';
import { Shipments } from '../../api/shipments/shipments';
import { ltmStart, ytdStart, allTimeStart } from '../calculations';

const CustomerOverviewInner = ({ customer, location, kpis }) => {
  const getKpis = () => {
    const pathname = location.pathname;
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
  };

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
};

CustomerOverviewInner.propTypes = {
  customer: PropTypes.object,
  kpis: PropTypes.object,
  location: PropTypes.object,
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

  const buildVolumeData = (arr, valPath, datePath, start = [], end = []) => {
    const now = moment(end);
    const firstOfNextMonth = moment(now).subtract(now.date(), 'days').add(1, 'months');
    const volumeData = [];
    while (start < now) {
      now.subtract(1, 'months');
      volumeData.push(0);
    }
    arr.forEach((item) => {
      const date = moment(item[datePath]);
      const value = item[valPath];
      if (date.isAfter(start)) {
        const dataIndex = firstOfNextMonth.diff(date, 'months');
        volumeData[dataIndex] += value;
      }
    });
    return volumeData.reverse();
  };

  const getDataLabels = (start = [], end = []) => {
    const dataLabels = [];
    const m = moment(start);
    const now = moment(end);
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

import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { createContainer } from 'meteor/react-meteor-data';

import { Customers } from '../../api/customers/customers';
import { Quotes } from '../../api/quotes/quotes';
import { Jobs } from '../../api/jobs/jobs';

import QuoteListItem from '../list-items/QuoteListItem.jsx';
import JobListItem from '../list-items/JobListItem.jsx';

import { currencyFormat } from '../formatters/currency-format';

class Customer extends Component {
  constructor(props) {
    super(props);
  }

  creditUsageStyle() {
    return {
      width: `${Math.round((this.props.customer.credit.used / this.props.customer.credit.total) * 100)}%`,
      height: '20px',
    };
  }

  render() {
    const { loading, customer, quotes, jobs } = this.props;
    return (
      <div>
        {loading ? <h1>Loading...</h1> :
          <div>
            <div className="panel">
              <div className="panel-header">
                <div className="panel-header-inner">
                  <div className="icon-container hidden-md-down">
                    <i className="icon fa fa-fw fa-address-card"/>
                  </div>
                  <div className="panel-header-content container">
                    <div className="row">
                      <div className="panel-title col-12 col-lg-6 align-left">
                        {customer.name}
                      </div>
                      <div className="col-6 col-lg-3 align-right">
                        {customer.activeQuotes.length} ACTIVE QUOTES<br/>
                        {customer.activeJobs.length} ACTIVE JOB
                      </div>
                      <div className="col-6 col-lg-3 align-right">
                        MTD +13,237 INR<br/>
                        LTM +178,391 INR
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="panel-body-inner">
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <span className="customer-industry">Pharmaceuticals</span>
                      <br/>
                      <span className="customer-credit">
                        {`${currencyFormat(customer.credit.used)} / ${currencyFormat(customer.credit.total)} ${customer.credit.currency} credit`}
                      </span>
                      <br />
                      <div className="progress">
                        <div className="progress-bar" role="progressbar"
                             style={this.creditUsageStyle()} aria-valuenow="25"
                             aria-valuemin="0" aria-valuemax="100"/>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <pre>{customer.address}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="quotes-list col-12 col-lg-6">
                <div className="list-title">
                  <h2>Quotes</h2>
                  <a href="/new-quote&c=1">
                    <button className="focis-button new-quote-button">New Quote</button>
                  </a>
                </div>
                {quotes.map(quote => <QuoteListItem key={quote._id} quote={quote}/>)}
                <div className="list-title">
                  <div className="btn focis-button">Show Inactive Quotes</div>
                </div>
              </div>
              <div className="jobs-list col-12 col-lg-6">
                <div className="list-title">
                  <h2>Jobs</h2>
                  <button id="new-job-button" className="focis-button new-job-button">New Job
                  </button>
                </div>
                {jobs.map(job => <JobListItem key={job._id} job={job}/>)}
                <div className="list-title">
                  <button className="btn focis-button">Show Inactive Jobs</button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="invoices-list col-12 col-lg-6">
                <div className="list-title">
                  <h2>Invoices</h2>
                  <button className="focis-button new-job-button">New Invoice</button>
                </div>
              </div>
              <div className="cargo-receipt-list col-12 col-lg-6">
                <div className="list-title">
                  <h2>Cargo Receipts</h2>
                  <button className="focis-button new-job-button">New Cargo Receipt</button>
                </div>
                <a className="card" href="/job/1">
                  <div className="card-inner">
                    <div className="icon-container hidden-md-down">
                      <div className="icon fa fa-fw fa-flag"></div>
                    </div>
                    <div className="card-content container">
                      <div className="row">
                        <div className="col-6">
                          <b>R198571</b><br/>
                          Jebel Ali 60k<br/>
                          13-Mar-2017
                        </div>
                        <div className="col-6">
                          25 Boxes<br/>
                          450.0 kg<br/>
                          5.230 cbm
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

        }
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

import React, { Component } from 'react';

export default class JobListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { job } = this.props;
    return (
      <a className="card">
        <div className="card-inner">
          <div className="icon-container hidden-md-down">
            <div className="icon fa fa-fw fa-ship"></div>
          </div>
          <div className="card-content container">
            <div className="row">
              <div className="col-6">
                <b>{job.jobCode}</b><br/>
                {job.status}<br/>
                {job.movementType}
              </div>
              <div className="col-6">
                {job.totalTEU} TEU<br/>
                <i className="fa fa-link"></i>{job.quoteCode}<br/>
                {job.netRevenue}
              </div>
            </div>
          </div>
        </div>
      </a>
    );
  }
}

JobListItem.propTypes = {
  job: React.PropTypes.object,
};

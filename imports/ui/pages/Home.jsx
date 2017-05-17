import React from 'react';

const Home = () => (
  <div className="">
    <div className="content home">
      <div className="splash-image-container" />
      <div className="home-kpis-container">
        <div className="heading">NEWS</div>
        <span className="news-item">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque elit, scelerisque vulputate dolor id, aliquam venenatis enim.</span>
        <div className="heading">TODAY</div>
        <div className="horizontal-kpi">
          <span className="label">QUOTES</span><span className="value">46</span>
        </div>
        <div className="horizontal-kpi">
          <span className="label">SHIPMENTS</span><span className="value">12</span>
        </div>
        <div className="horizontal-kpi">
          <span className="label">INVOICES</span><span className="value">10</span>
        </div>
        <div className="heading">MAY</div>
        <div className="horizontal-kpi">
          <span className="label">NET REVENUE</span><span className="value">87 k</span>
        </div>
        <div className="horizontal-kpi">
          <span className="label">JOBS/FTE</span><span className="value">52</span>
        </div>
        <div className="horizontal-kpi">
          <span className="label">NEW CUSTOMERS</span><span className="value">4</span>
        </div>
      </div>
    </div>
    <div className="content-footer-accent home-footer-accent" />
  </div>
);

export default Home;

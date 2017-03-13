import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load templates
import '../../ui/layouts/app-body.js';
import '../../ui/components/dropdown.js';
import '../../ui/components/mention.js';
import '../../ui/components/collapse-button.js';

import '../../ui/layouts/customers.js';
import '../../ui/layouts/customer.js';
import '../../ui/layouts/quotes.js';
import '../../ui/layouts/rates.js';
import '../../ui/layouts/user-profile.js';

import '../../ui/components/customer-list-item.js';

import '../../ui/layouts/new-quote.js';
import '../../ui/layouts/get-rates.js';
import '../../ui/layouts/job.js';
import '../../ui/components/input.js';

BlazeLayout.setRoot('body');

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('AppBody', { main: 'RootRedirector', content: 'Home' });
  },
});

/**
 *  CUSTOMERS
 **/
FlowRouter.route('/customers', {
  name: 'Customers',
  action() {
    BlazeLayout.render('AppBody', { content: 'Customers'});
  },
});

FlowRouter.route('/customer/:_id', {
  name: 'Customer',
  action() {
    BlazeLayout.render('AppBody', { content: 'Customer' });
  },
});

FlowRouter.route('/new-quote:customer', {
  name: 'Customer.show',
  action() {
    BlazeLayout.render('AppBody', { content: 'NewQuote' });
  },
});

FlowRouter.route('/get-rates', {
  name: 'Customer.show',
  action() {
    BlazeLayout.render('AppBody', { content: 'GetRates' });
  },
});

/**
 *  QUOTES
 **/
FlowRouter.route('/quotes', {
  name: 'Quotes',
  action() {
    BlazeLayout.render('AppBody', { content: 'Quotes'});
  },
});

/**
 * JOBS
 */
FlowRouter.route('/job/:jobNumber', {
  name: 'Job',
  action() {
    BlazeLayout.render('AppBody', { content: 'Job'});
  },
});

/**
 *  RATES
 **/
FlowRouter.route('/rates', {
  name: 'Rates',
  action() {
    BlazeLayout.render('AppBody', { content: 'Rates'});
  },
});

FlowRouter.route('/user-profile/:_id', {
  name: 'UserProfile',
  action() {
    BlazeLayout.render('AppBody', { content: 'UserProfile'});
  },
});

/*
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
*/
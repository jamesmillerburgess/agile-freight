import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load templates
import '../../ui/layouts/app-body';

import '../../ui/layouts/customers';
import '../../ui/layouts/customer';
import '../../ui/layouts/quotes';
import '../../ui/layouts/rates';
import '../../ui/layouts/user-profile';

import '../../ui/components/customer-list-item';

import '../../ui/layouts/new-quote';
import '../../ui/layouts/get-rates';
import '../../ui/layouts/job';
import '../../ui/components/input';
import '../../ui/components/free-text-field';
import '../../ui/components/file-field';
import '../../ui/components/dropdown';
import '../../ui/components/mention';
import '../../ui/components/collapse-button';
import '../../ui/components/stakeholder';
import '../../ui/components/user-id';
import '../../ui/formatters/smart-highlight';

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
    BlazeLayout.render('AppBody', { content: 'job' });
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
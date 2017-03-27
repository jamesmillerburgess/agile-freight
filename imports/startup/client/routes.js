import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load templates
import '../../ui/app-core/app-body';
import '../../ui/app-core/main';

import '../../ui/list-pages/customers';
import '../../ui/object-view-pages/customer';
import '../../ui/list-pages/quotes';
import '../../ui/list-pages/rates';
import '../../ui/object-view-pages/user-profile';
import '../../ui/app-core/sign-in';

import '../../ui/list-items/customer-list-item';
import '../../ui/list-items/quote-list-item';
import '../../ui/list-items/job-list-item';
import '../../ui/list-items/update-list-item';

import '../../ui/object-creation-pages/new-quote';
import '../../ui/object-view-pages/job';

import '../../ui/components/field';
import '../../ui/components/input';
import '../../ui/components/free-text-field';
import '../../ui/components/file-field';
import '../../ui/components/dropdown';
import '../../ui/components/mention';
import '../../ui/components/collapse-button';
import '../../ui/components/user-id';

import '../../ui/formatters/smart-highlight';
import '../../ui/formatters/date-format';
import '../../ui/formatters/currency-format';
import '../../ui/formatters/caps';

BlazeLayout.setRoot('body');

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('appBody', { main: 'RootRedirector', content: 'Home' });
  },
});

/**
 *  CUSTOMERS
 **/
FlowRouter.route('/customers', {
  name: 'Customers',
  action() {
    BlazeLayout.render('appBody', { content: 'customers' });
  },
});

FlowRouter.route('/customer/:_id', {
  name: 'Customer',
  action() {
    BlazeLayout.render('appBody', { content: 'customer' });
  },
});

FlowRouter.route('/new-quote:customer', {
  name: 'Customer.show',
  action() {
    BlazeLayout.render('appBody', { content: 'NewQuote' });
  },
});

FlowRouter.route('/get-rates', {
  name: 'Customer.show',
  action() {
    BlazeLayout.render('appBody', { content: 'GetRates' });
  },
});

/**
 *  QUOTES
 **/
FlowRouter.route('/quotes', {
  name: 'Quotes',
  action() {
    BlazeLayout.render('appBody', { content: 'Quotes' });
  },
});

/**
 * JOBS
 */
FlowRouter.route('/job/:_id', {
  name: 'Job',
  action() {
    BlazeLayout.render('appBody', { content: 'job' });
  },
});

/**
 *  RATES
 **/
FlowRouter.route('/rates', {
  name: 'Rates',
  action() {
    BlazeLayout.render('appBody', { content: 'Rates' });
  },
});

FlowRouter.route('/user-profile/:_id', {
  name: 'UserProfile',
  action() {
    BlazeLayout.render('appBody', { content: 'UserProfile' });
  },
});

/*
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
*/

import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load templates
import '../../ui/layouts/app-body.js';
import '../../ui/components/dropdown.js';
import '../../ui/components/mention.js';
import '../../ui/components/collapse-button.js';

import '../../ui/layouts/new-quote.js';
import '../../ui/components/product-button.js';
import '../../ui/components/input.js';

BlazeLayout.setRoot('body');

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('NewQuote', { main: 'App_rootRedirector' });

  },
});

/*
FlowRouter.route('/job/:_id', {
  name: 'Job.show',
  action() {
    BlazeLayout.render('App_body', { content: 'Jobs_showPage' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
*/
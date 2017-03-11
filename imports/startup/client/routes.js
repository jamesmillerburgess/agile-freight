import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load templates
import '../../ui/layouts/app-body.js';
import '../../ui/components/dropdown.js';
import '../../ui/components/mention.js';
import '../../ui/components/collapse-button.js';

BlazeLayout.setRoot('body');

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App-Body', { main: 'App_rootRedirector' });
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
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
//import { Jobs } from '../../api/jobs/jobs.js';

import './root-redirector.html';

Template.App_rootRedirector.onCreated(() => {
  // We need to set a timeout here so that we don't redirect from inside a redirection
  //   which is a no-no in FR.
  Meteor.defer(() => {
    //FlowRouter.go('/', Jobs.findOne());
  });
});

import { Template } from 'meteor/templating';

import './main.html';
import './main.less';

import { Customers } from '../../api/customers/customers';
import { Quotes } from '../../api/quotes/quotes';
import { Jobs } from '../../api/jobs/jobs';


Template.main.onCreated(function onCreated() {
  this.subscribe('branch.active');
});

Template.main.helpers({
  customers() {
    return Customers.find({});
  },
  quotes() {
    console.log(Quotes.findOne());
    return Quotes.find({});
  },
  jobs() {
    return Jobs.find({});
  },

});

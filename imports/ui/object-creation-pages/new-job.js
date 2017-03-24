import { Template } from 'meteor/templating';

import './new-job.html';
import './new-job.less';

Template.newJob.onCreated(function onCreated() {
  this.data.productOptions = ['Air', 'Ocean', 'Road', ''];
  this.data.incotermOptions = ['CFR', 'CIF', 'CIP', 'CPT', 'DAF', 'DAP', 'DAT', 'DDP', 'DDU', 'EXW', 'FAS', 'FCA', 'FOB', ''];
});

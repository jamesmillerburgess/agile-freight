import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Rates } from '../../api/rates/rates.js';

import './get-rates.html';
import './get-rates.less';

Template.GetRates.onRendered(() => {
});

Template.GetRates.helpers({
  rates() {
    return Rates.find({ originPort: 'NOSVG', destinationPort: 'SCVIC' });
  },
});

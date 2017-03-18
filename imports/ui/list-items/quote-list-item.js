import { Template } from 'meteor/templating';

import './quote-list-item.html';
import './quote-list-item.less';

Template.quoteListItem.onCreated(function onCreated() {
  //console.log(this.data);
});

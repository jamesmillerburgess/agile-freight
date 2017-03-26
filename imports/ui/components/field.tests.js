/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
// import { Foo } from '/collections/foo.js';
import { chai } from 'meteor/practicalmeteor:chai';
// Will define Template.foo
// import './field.html'; // your template
// Will set up Template.foo.__helpers[' bar']

if (Meteor.isClient) {
  require('./field');

  describe('Field handlers', () => {
    it('Should test bar', () => {
      const bar = Template.field.__helpers[' overdueClass'].apply(); // don't forget the space, method is ' bar' not 'bar'
      console.log(bar);
    });
  });
}


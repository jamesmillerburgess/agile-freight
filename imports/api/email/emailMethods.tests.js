/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

// import { chai } from 'meteor/practicalmeteor:chai';
// import { Meteor } from 'meteor/meteor';
// import 'meteor/xolvio:email-stub';
//
// import './emailMethods';
//
// chai.should();
//
// if (Meteor.isServer) {
//   describe('Email Methods', () => {
//     Meteor.call('emailStub/stub');
//     beforeEach(() => {
//       Meteor.call('emailStub/reset');
//     });
//     describe('email.send', () => {
//       it('sends an email from agilityfreightdemo@gmail.com', (done) => {
//         Meteor.call('email.send', {
//           to: 'a@a.com',
//           from: 'b@b.com',
//           subject: 'c',
//           html: 'd',
//         });
//         Meteor.call('emailStub/getEmails', (e, emails) => {
//           emails.length.should.equal(1);
//           emails[0].to.should.equal('a@a.com');
//           emails[0].from.should.equal('b@b.com');
//           emails[0].subject.should.equal('c');
//           emails[0].html.should.equal('d');
//           done();
//         });
//       });
//     });
//   });
// }

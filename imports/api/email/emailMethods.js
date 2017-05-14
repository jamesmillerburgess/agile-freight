import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { SSR } from 'meteor/meteorhacks:ssr';

import { CustomerQuotes } from '../customerQuotes/customerQuotesCollection';

Meteor.methods({
  'email.send': function emailSend(options) {
    this.unblock();
    SSR.compileTemplate('htmlEmail', Assets.getText('quoteEmail.html'));
    const customerQuote = CustomerQuotes.findOne(options.customerQuoteId);
    
    const {
      charges,
    } = customerQuote;
    const emailData = {
      message: options.message,
      name: 'Doug Funnie',
      favoriteRestaurant: 'Honker Burger',
      bestFriend: 'Skeeter Valentine',
      charges,
    };
    Email.send({
      ...options,
      html: SSR.render('htmlEmail', emailData),
    });
  },
});

import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { SSR } from 'meteor/meteorhacks:ssr';

import { CustomerQuotes } from '../customerQuotes/customerQuotesCollection';
import { currencyFormat } from '../../ui/formatters/numberFormatters';

const stringToHTML = string => string.replace(new RegExp(' ', 'g'), '&nbsp;').replace(new RegExp('\n', 'g'), '<br /><br />');

SSR.compileTemplate('htmlEmail', Assets.getText('quoteEmail.html'));

Meteor.methods({
  'email.send': function emailSend(options) {
    this.unblock();
    const customerQuote                         = CustomerQuotes.findOne(options.customerQuoteId);
    customerQuote.charges.chargeLines = customerQuote.charges.chargeLines.map(charge => ({
      ...charge,
      unitPrice: currencyFormat(charge.unitPrice),
      amount: currencyFormat(charge.amount),
    }));
    const emailData                             = {
      message: stringToHTML(options.message),
      originCharges: customerQuote.charges.chargeLines.filter(charge => charge.group === 'Origin'),
      internationalCharges: customerQuote.charges.chargeLines.filter(charge => charge.group === 'International'),
      destinationCharges: customerQuote.charges.chargeLines.filter(charge => charge.group === 'Destination'),
      ...customerQuote,
    };
    emailData.charges.totalOriginCharges        = currencyFormat(emailData.charges.totalOriginCharges);
    emailData.charges.totalInternationalCharges = currencyFormat(emailData.charges.totalInternationalCharges);
    emailData.charges.totalDestinationCharges   = currencyFormat(emailData.charges.totalDestinationCharges);
    emailData.charges.totalCharges              = currencyFormat(emailData.charges.totalCharges);
    Email.send({
      ...options,
      html: SSR.render('htmlEmail', emailData),
    });
  },
});

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { Quotes } from '../quotes/quotesCollection';
import QuoteEmail from '../../ui/objects/QuoteEmail.jsx';

Meteor.methods({
  'email.send': function emailSend(options) {
    check(options, Object);
    this.unblock();
    const quote = Quotes.findOne(options.quoteId);
    const html  = ReactDOMServer
      .renderToStaticMarkup(<QuoteEmail message={options.message} quote={quote} />);
    Email.send({
      ...options,
      html,
    });
  },
});

// import { SSR } from 'meteor/meteorhacks:ssr';
//
// import { Quotes } from '../quotes/quotesCollection';
// import { currencyFormat } from '../../ui/formatters/numberFormatters';

// const stringToHTML = string => string.replace(new RegExp(' ', 'g'), '&nbsp;').replace(new RegExp('\n', 'g'), '<br /><br />');

// SSR.compileTemplate('htmlEmail', Assets.getText('quoteEmail.html'));

// Meteor.methods({
//   'email.send': function emailSend(options) {
//     this.unblock();
//     const quote                         = Quotes.findOne(options.quoteId);
//     quote.charges.chargeLines = quote.charges.chargeLines.map(charge => ({
//       ...charge,
//       unitPrice: currencyFormat(charge.unitPrice),
//       amount: currencyFormat(charge.amount),
//     }));
//     const emailData                             = {
//       isLoose: quote.cargo.cargoType === 'Loose',
//       message: stringToHTML(options.message),
//       originCharges: quote.charges.chargeLines.filter(charge => charge.group === 'Origin'),
//       internationalCharges: quote.charges.chargeLines.filter(charge => charge.group === 'International'),
//       destinationCharges: quote.charges.chargeLines.filter(charge => charge.group === 'Destination'),
//       ...quote,
//     };
//     emailData.charges.totalOriginCharges        = currencyFormat(emailData.charges.totalOriginCharges);
//     emailData.charges.totalInternationalCharges = currencyFormat(emailData.charges.totalInternationalCharges);
//     emailData.charges.totalDestinationCharges   = currencyFormat(emailData.charges.totalDestinationCharges);
//     emailData.charges.totalCharges              = currencyFormat(emailData.charges.totalCharges);
//     Email.send({
//       ...options,
//       html: SSR.render('htmlEmail', emailData),
//     });
//   },
// });

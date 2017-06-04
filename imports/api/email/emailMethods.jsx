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
    const html  = ReactDOMServer.renderToStaticMarkup((
      <QuoteEmail message={options.message} quote={quote} />
    ));
    Email.send({
      ...options,
      html,
    });
  },
});

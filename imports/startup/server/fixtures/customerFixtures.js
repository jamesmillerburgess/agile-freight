import { Meteor } from 'meteor/meteor';

export default class customerFixtures {

  static random(num = 0) {
    const newCustomers = [];

    // Pre-fetch these guys so we don't do it over and over in the loop

    for (let i = 0; i < num; i += 1) {
      const rand = Math.random();

      // Set all the properties that have no dependencies
      const customer = {
        customerCode: `C${Math.floor(rand * (900000 - 100000)) + 100000}`,
        quotes: [],
        shipments: [],
        invoices: [],
        activeQuotes: ['1', '2'],
        activeJobs: ['1'],
        credit: {
          currency: 'INR',
          total: 119000,
          used: 24000,
        },
      };

      // Then work out the values for the properties that have dependencies
      const names = {
        name: ['Alstom', 'Herbert', 'James', 'Cecilia', 'Gregg'],
        adjective: ['Awesome', 'Sensational', 'Gregarious', 'Hyper'],
        product: ['Power Boilers', 'Pills', 'Urinals', 'Perfume'],
        suffix: ['Inc.', 'Ltd.', 'Corp', 'International', 'Worldwide', 'Limited'],
      };
      customer.name = `${_.sample(names.name)} ${_.sample(names.adjective)} ${_.sample(names.product)} ${_.sample(names.suffix)}`;
      customer.address = `Jubilee Hills
Hyderabad, Telangana, 500033
India`;

      // Add to the array
      newCustomers.push(customer);
    }

    // Stick them in the collection
    _.each(newCustomers, doc => Meteor.call('customer.new', doc));
  }
}

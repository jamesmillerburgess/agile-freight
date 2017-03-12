import { Meteor } from 'meteor/meteor';
import { Rates } from '../../api/rates/rates';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  // if (Jobs.find().count() === 0) {
  //   Jobs.remove({});
  //   Jobs._ensureIndex({ search: 1 });
  // }
});

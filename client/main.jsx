import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/client/routes.jsx';

Meteor.startup(() => {
  Meteor.startup(() => {
    navigator.serviceWorker.register('/sw.js')
      .then()
      .catch(err => console.log('ServiceWorker registration failed: ', err));
  });
  render(renderRoutes(), document.getElementById('app'));
});

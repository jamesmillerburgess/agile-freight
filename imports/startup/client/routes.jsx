import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Loadable from 'react-loadable';

import app from '../../state/app';

const store = createStore(
  app,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export const renderRoutes = () => (
  <Provider store={store}>
    <Loadable loader={() => import('../../ui/app-core/Main.jsx')} />
  </Provider>
);

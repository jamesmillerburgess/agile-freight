import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import app from '../../state/app';
import Main from '../../ui/app-core/Main.jsx';

const store = createStore(
  app,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export const renderRoutes = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

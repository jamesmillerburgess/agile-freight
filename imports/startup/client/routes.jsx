import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import app from '../../state/app';

import { appSearch } from '../../state/actions/actions';

import Main from '../../ui/app-core/Main.jsx';

const store = createStore(
  app,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
store.dispatch(appSearch('hello2'));
store.dispatch({ type: 'ADD_PACKAGE_LINE', num: 1 });
store.dispatch({ type: 'ADD_PACKAGE_LINE', num: 2 });

console.log(store.getState());
store.dispatch({ type: 'REMOVE_PACKAGE_LINE', index: 1 });
console.log(store.getState());
store.dispatch({ type: 'EDIT_PACKAGE_LINE', index: 0, packageLine: { num: 3, packageType: 'Bolts' } });
console.log(store.getState());
export const renderRoutes = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

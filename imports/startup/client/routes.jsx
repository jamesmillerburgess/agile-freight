import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

// route components
import App from '../../ui/app-core/App.jsx';
import CustomerList from '../../ui/lists/CustomerList.jsx';
// import AppContainer from '../../ui/containers/AppContainer.jsx';
// import ListPageContainer from '../../ui/containers/ListPageContainer.jsx';
// import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.jsx';
// import AuthPageJoin from '../../ui/pages/AuthPageJoin.jsx';
// import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';

export const renderRoutes = () => (
  <BrowserRouter>
    <div>
      <App />
      <Route path="/customers" component={CustomerList} />
    </div>
  </BrowserRouter>
);

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// route components
import Nav from '../../ui/app-core/Nav.jsx';
import MainContainer from '../../ui/app-core/Main.jsx';
import CustomerList from '../../ui/lists/CustomerList.jsx';

export const renderRoutes = () => (
  <BrowserRouter>
    <div>
      <Nav />
      <Route path="/" component={MainContainer} />
      <Route path="/customers" />
    </div>
  </BrowserRouter>
);

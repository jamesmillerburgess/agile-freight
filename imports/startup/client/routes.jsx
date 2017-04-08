import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// route components
import Nav from '../../ui/app-core/Nav.jsx';
import MainContainer from '../../ui/app-core/Main.jsx';

export const renderRoutes = () => (
  <BrowserRouter>
    <Route
      render={props => (
        <div>
          <Nav {...props} />
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={200}
            transitionLeaveTimeout={0}
          >
            <Route
              location={props.location}
              key={props.location.key}
              path="/"
              component={MainContainer}
            />
          </ReactCSSTransitionGroup>
        </div>
      )}/>
  </BrowserRouter>
);

import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from '../containers/app';

function getRouter(history) {
  return (
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  );
}

export default getRouter;

import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from '../containers/app';
import Main from '../containers/Main';
import Login from '../containers/login';
import SurveyBuilder from '../containers/surveyBuilder';

function getRouter(history) {
  return (
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="main" component={Main} />
      <Route path="login" component={Login} />
      <Route path="surveyBuilder" component={SurveyBuilder} />
    </Router>
  );
}

export default getRouter;

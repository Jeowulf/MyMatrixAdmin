import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from '../containers/app';
import Main from '../containers/Main';
import Login from '../containers/login';
import SurveyBuilder from '../containers/surveyBuilder';
import ResponsesView from '../containers/responsesView';

function getRouter(history) {
  return (
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="main" component={Main} />
      <Route path="login" component={Login} />
      <Route path="surveyBuilder" component={SurveyBuilder} />
      <Route path="responsesView" component={ResponsesView} />
    </Router>
  );
}

export default getRouter;

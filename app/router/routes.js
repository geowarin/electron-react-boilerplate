import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './../ui/containers/App';
import HomePage from './../ui/containers/HomePage';
import CounterPage from './../ui/containers/CounterPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="/counter" component={CounterPage}/>
  </Route>
);

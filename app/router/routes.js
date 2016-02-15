import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './../ui/containers/App';
import Editor from './../ui/components/editor/Editor';
import CounterPage from './../ui/containers/CounterPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Editor}/>
    <Route path="/counter" component={CounterPage}/>
  </Route>
);

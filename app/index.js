import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import history from './router/history';
import routes from './router/routes';
import configureStore from './store/configureStore';

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);

import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

import history from '../history';
import { syncHistory } from 'redux-simple-router';

const historyMiddleware = syncHistory(history);

const middlewares = process.env.NODE_ENV === 'development' ?
  [applyMiddleware(historyMiddleware), DevTools.instrument()] :
  [applyMiddleware(historyMiddleware)];
const finalCreateStore = compose(...middlewares)(createStore);

var initialize = (initialState = {}) => {
  const store = finalCreateStore(rootReducer, initialState);
  if (process.env.NODE_ENV === 'development') {
    historyMiddleware.listenForReplays(store);
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }
  return store;
};

export default initialize;

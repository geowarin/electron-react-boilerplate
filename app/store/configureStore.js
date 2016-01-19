import { createStore, applyMiddleware, compose } from 'redux';
import isDev from 'isdev';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

const middlewares = isDev ?
  [applyMiddleware(thunk), DevTools.instrument()] :
  [applyMiddleware(thunk)];
const finalCreateStore = compose(...middlewares)(createStore);

var initialize = (initialState = {}) => {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      console.log(nextReducer);
      store.replaceReducer(nextReducer);
    });
  }
  return store;
};

export default initialize;

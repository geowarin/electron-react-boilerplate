import { combineReducers } from 'redux';
import counter from './counter';
import { routeReducer } from 'redux-simple-router';

export default combineReducers({
  routing: routeReducer,
  counter
});

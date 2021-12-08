/* eslint-disable import/no-extraneous-dependencies */
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import todo from './reducer/todo';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  todo,
});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;

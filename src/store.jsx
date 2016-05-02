import {compose, applyMiddleware, combineReducers, createStore} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';
import reducer from './reducers';

const identity = (x) => x;

export default (initialState) =>
  compose(
    applyMiddleware(
      thunkMiddleware,
      routerMiddleware(browserHistory),
      createLogger()),
    window.devToolsExtension ? window.devToolsExtension() : identity
  )(createStore)(reducer, initialState);

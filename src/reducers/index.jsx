import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import popoverReducer from './popover';
import speedtestReducer from './speedtest';

export default combineReducers({
  routing: routerReducer,
  popover: popoverReducer,
  speedtest: speedtestReducer
});

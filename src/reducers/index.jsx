import {combineReducers} from 'redux';
import popoverReducer from './popover';
import workflowReducer from './workflow';
import speedtestReducer from './speedtest';

export default combineReducers({
  popover: popoverReducer,
  workflow: workflowReducer,
  speedtest: speedtestReducer
});

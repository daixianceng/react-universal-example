import { combineReducers } from 'redux';
import category from './category';
import navDrawer from './navDrawer';
import notification from './notification';
import runtime from './runtime';

export default combineReducers({
  category,
  navDrawer,
  notification,
  runtime,
});

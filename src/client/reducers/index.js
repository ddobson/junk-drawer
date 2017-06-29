import { combineReducers } from 'redux';
import form from './forms';
import auth from './auth';
import links from './links';

export default combineReducers({
  auth,
  form,
  links,
});

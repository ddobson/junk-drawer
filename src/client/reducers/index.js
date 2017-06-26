import { combineReducers } from 'redux';
import form from './forms';
import auth from './auth';

export default combineReducers({
  auth,
  form,
});

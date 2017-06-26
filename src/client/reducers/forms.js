import { reducer as formReducer } from 'redux-form';
import { AUTH_STATUS } from '../actions/auth';

const form = formReducer.plugin({
  signin: (state, action) => {
    switch (action.type) {
      case AUTH_STATUS:
        return undefined;
      default:
        return state;
    }
  },
});

export default form;

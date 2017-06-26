import {
  AUTH_SUCCESS,
  AUTH_LOADING,
  AUTH_ERROR,
} from '../actions/auth';

export default function auth(state = {}, action) {
  switch (action.type) {
    case AUTH_LOADING:
      return { ...state, isLoading: action.payload };
    case AUTH_SUCCESS:
      return { ...state, isAuthenticated: action.payload };
    case AUTH_ERROR: {
      const { hasErrored, error } = action.payload;
      return { ...state, hasErrored, error };
    }
    default:
      return state;
  }
}

import axios from 'axios';
import apiOrigin from '../config/apiOrigin';

export const AUTH_LOADING = 'AUTH_LOADING';
export const AUTH_STATUS = 'AUTH_STATUS';
export const AUTH_ERROR = 'AUTH_ERROR';

export function authIsLoading(bool) {
  return {
    type: AUTH_LOADING,
    payload: bool,
  };
}

export function authStatus(bool) {
  return {
    type: AUTH_STATUS,
    payload: bool,
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function signInUser(formData, previousError) {
  return async dispatch => {
    try {
      dispatch(authIsLoading(true)); // Set app to loading

      const signInResponse = await axios({
        url: `${apiOrigin[process.env.NODE_ENV]}/auth/signin`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: formData,
      });

      localStorage.setItem('token', signInResponse.data.token);
      dispatch(authStatus(true));

      // If an error occured prior to successful auth, sanitize the error state
      if (previousError) {
        dispatch(authError({ hasErrored: false, error: '' }));
      }
    } catch (error) {
      dispatch(authError({ hasErrored: true, error: error.response.data }));
    } finally {
      dispatch(authIsLoading(false));
    }
  };
}

export function signUpUser(formData, previousError) {
  return async dispatch => {
    try {
      dispatch(authIsLoading(true)); // Set app to loading

      const signUpResponse = await axios({
        url: `${apiOrigin[process.env.NODE_ENV]}/auth/signup`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: formData,
      });

      localStorage.setItem('token', signUpResponse.data.token);
      dispatch(authStatus(true));

      // If an error occured prior to successful auth, sanitize the error state
      if (previousError) {
        dispatch(authError({ hasErrored: false, error: '' }));
      }
    } catch (error) {
      dispatch(
        authError({ hasErrored: true, error: error.response.data.error })
      );
    } finally {
      dispatch(authIsLoading(false));
    }
  };
}

export function signOutUser() {
  return dispatch => {
    dispatch(authStatus(false));
    localStorage.removeItem('token');
  };
}

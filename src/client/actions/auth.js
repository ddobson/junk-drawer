import axios from 'axios';

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

export function signInUser(formData) {
  return (dispatch) => {
    dispatch(authError({ hasErrored: false, error: '' })); // Sanitize auth error state
    dispatch(authIsLoading(true)); // Set app to loading

    const signInResponse = axios({
      url: 'http://localhost:3001/auth/signin',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: formData,
    });

    signInResponse
      .then(response => response.data)
      .then((data) => {
        localStorage.setItem('token', data.token);
        dispatch(authStatus(true));
      })
      .catch((error) => {
        dispatch(authError({ hasErrored: true, error: error.response.data }));
      });

    dispatch(authIsLoading(false));
  };
}

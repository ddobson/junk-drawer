import axios from 'axios';
import keyBy from 'lodash/keyBy';
import apiOrigin from '../config/apiOrigin';

export const LINKS_HAS_ERRORED = 'LINKS_HAS_ERRORED';
export const LINKS_IS_LOADING = 'LINKS_IS_LOADING';
export const LINKS_FETCH_DATA_SUCCESS = 'LINKS_FETCH_DATA_SUCCESS';

export function linksHasErrored(error) {
  return {
    type: 'LINKS_HAS_ERRORED',
    payload: error,
  };
}

export function linksIsLoading(bool) {
  return {
    type: 'LINKS_IS_LOADING',
    payload: bool,
  };
}

export function linksFetchDataSuccess(links) {
  return {
    type: 'LINKS_FETCH_DATA_SUCCESS',
    payload: links,
  };
}

export function linksFetchData() {
  return async (dispatch) => {
    const authToken = localStorage.getItem('token');

    try {
      dispatch(linksIsLoading(true));
      dispatch(linksHasErrored({ hasErrored: false, error: '' }));

      const linksResponse = await axios({
        url: `${apiOrigin[process.env.NODE_ENV]}/api/links`,
        method: 'get',
        headers: {
          authorization: authToken,
          'Content-Type': 'application/json',
        },
      });

      const links = keyBy(linksResponse.data.links, '_id');

      dispatch(linksFetchDataSuccess(links));
    } catch (error) {
      if (error.response) {
        dispatch(linksHasErrored({ hasErrored: true, error: error.response.data }));
      } else {
        dispatch(linksHasErrored({ hasErrored: true, error: 'Uh oh, something went wrong!' }));
      }
    } finally {
      dispatch(linksIsLoading(false));
    }
  };
}

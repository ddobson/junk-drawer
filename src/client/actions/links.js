import axios from 'axios';
import keyBy from 'lodash/keyBy';
import assign from 'lodash/assign';
import apiOrigin from '../config/apiOrigin';

export const LINKS_HAS_ERRORED = 'LINKS_HAS_ERRORED';
export const LINKS_IS_LOADING = 'LINKS_IS_LOADING';
export const LINKS_DISMISS_ERROR = 'LINKS_DISMISS_ERROR';
export const LINKS_FETCH_DATA_SUCCESS = 'LINKS_FETCH_DATA_SUCCESS';
export const LINKS_CREATE_LINK_SUCCESS = 'LINKS_CREATE_LINK_SUCCESS';
export const LINKS_DESTROY_LINK_SUCCESS = 'LINKS_DESTROY_LINK_SUCCESS';

export function linksHasErrored(error) {
  return {
    type: LINKS_HAS_ERRORED,
    payload: error,
  };
}

export function linksIsLoading(bool) {
  return {
    type: LINKS_IS_LOADING,
    payload: bool,
  };
}

export function linksFetchDataSuccess(links) {
  return {
    type: LINKS_FETCH_DATA_SUCCESS,
    payload: links,
  };
}

export function linksCreateLinkSuccess(link) {
  return {
    type: LINKS_CREATE_LINK_SUCCESS,
    payload: link,
  };
}

export function linksDestroyLinkSuccess(id) {
  return {
    type: LINKS_DESTROY_LINK_SUCCESS,
    payload: id,
  };
}

export function linksDismissError(id) {
  return {
    type: LINKS_DISMISS_ERROR,
    payload: id,
  };
}

export function _linksHandleErrors(dispatch, error) {
  function KeyId() {
    this.id = Math.random().toString().slice(2);
  }

  if (error.response) {
    dispatch(
      linksHasErrored({
        hasErrored: true,
        errors: error.response.data.error.errors.map(error =>
          assign(error, new KeyId())
        ),
      })
    );
  } else {
    const genericError = { message: 'Uh oh, something went wrong!' };
    assign(genericError, new KeyId());

    dispatch(
      linksHasErrored({
        hasErrored: true,
        errors: [genericError],
      })
    );
  }
}

export function linksFetchData() {
  return async dispatch => {
    try {
      dispatch(linksIsLoading(true));

      const authToken = localStorage.getItem('token');
      const response = await axios({
        url: `${apiOrigin}/api/links`,
        method: 'get',
        headers: {
          authorization: authToken,
          'Content-Type': 'application/json',
        },
      });

      const links = keyBy(response.data.links, '_id');

      dispatch(linksFetchDataSuccess(links));
    } catch (error) {
      _linksHandleErrors(dispatch, error);
    } finally {
      dispatch(linksIsLoading(false));
    }
  };
}

export function linksCreateLink(data) {
  return async dispatch => {
    try {
      const linkData = { ...data };
      linkData.domain = { fullName: 'junk-drawer.link' };

      // dispatch(linksIsLoading(true));
      dispatch(linksHasErrored({ hasErrored: false, errors: [] }));

      const authToken = localStorage.getItem('token');
      const response = await axios({
        url: `${apiOrigin}/api/links`,
        method: 'post',
        headers: {
          authorization: authToken,
          'Content-Type': 'application/json',
        },
        data: linkData,
      });

      const link = response.data;

      dispatch(linksCreateLinkSuccess(link));
    } catch (error) {
      _linksHandleErrors(dispatch, error);
    } finally {
      // dispatch(linksIsLoading(false));
    }
  };
}

export function linksDestroyLink(id) {
  return async dispatch => {
    try {
      const authToken = localStorage.getItem('token');
      await axios({
        url: `${apiOrigin}/api/links/${id}`,
        method: 'delete',
        headers: {
          authorization: authToken,
        },
      });

      dispatch(linksDestroyLinkSuccess(id));
    } catch (error) {
      _linksHandleErrors(dispatch, error);
    }
  };
}

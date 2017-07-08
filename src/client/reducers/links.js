import omit from 'lodash/omit';
import {
  LINKS_HAS_ERRORED,
  LINKS_IS_LOADING,
  LINKS_FETCH_DATA_SUCCESS,
  LINKS_CREATE_LINK_SUCCESS,
  LINKS_DESTROY_LINK_SUCCESS,
} from '../actions/links';

const metaInitialState = {
  isLoading: false,
  hasErrored: false,
  error: '',
};

export function links(state = {}, action) {
  switch (action.type) {
    case LINKS_FETCH_DATA_SUCCESS: {
      return { ...action.payload };
    }
    case LINKS_CREATE_LINK_SUCCESS: {
      return { ...state, [action.payload._id]: action.payload };
    }
    case LINKS_DESTROY_LINK_SUCCESS: {
      return omit(state, action.payload);
    }
    default:
      return state;
  }
}

export function linksMeta(state = metaInitialState, action) {
  switch (action.type) {
    case LINKS_HAS_ERRORED: {
      const { hasErrored, error } = action.payload;
      return { ...state, hasErrored, error };
    }
    case LINKS_IS_LOADING: {
      return { ...state, isLoading: action.payload };
    }
    default:
      return state;
  }
}

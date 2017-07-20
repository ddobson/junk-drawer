import omit from 'lodash/omit';
import filter from 'lodash/filter';
import {
  LINKS_HAS_ERRORED,
  LINKS_IS_LOADING,
  LINKS_DISMISS_ERROR,
  LINKS_FETCH_DATA_SUCCESS,
  LINKS_CREATE_LINK_SUCCESS,
  LINKS_DESTROY_LINK_SUCCESS,
} from '../actions/links';

const metaInitialState = {
  isLoading: false,
  hasErrored: false,
  errors: [],
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
      const { hasErrored, errors } = action.payload;
      return { ...state, hasErrored, errors };
    }
    case LINKS_DISMISS_ERROR: {
      const newState = { ...state };
      newState.errors = filter(
        newState.errors,
        err => err._messageId !== action.payload
      );
      if (newState.errors.length === 0) newState.hasErrored = false;
      return newState;
    }
    case LINKS_IS_LOADING: {
      return { ...state, isLoading: action.payload };
    }
    default:
      return state;
  }
}

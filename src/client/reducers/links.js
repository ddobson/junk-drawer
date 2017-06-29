import {
  LINKS_HAS_ERRORED,
  LINKS_IS_LOADING,
  LINKS_FETCH_DATA_SUCCESS,
} from '../actions/links';

export default function(state = {}, action) {
  switch (action.type) {
    case LINKS_HAS_ERRORED: {
      const { hasErrored, error } = action.payload;
      return { ...state, hasErrored, error };
    }
    case LINKS_IS_LOADING: {
      return { ...state, isLoading: action.payload };
    }
    case LINKS_FETCH_DATA_SUCCESS: {
      return { ...state, data: action.payload };
    }
    default:
      return state;
  }
}

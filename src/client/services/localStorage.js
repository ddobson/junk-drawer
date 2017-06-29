import omit from 'lodash/omit';

export function loadSerializedState() {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

export function saveState(state) {
  try {
    const copy = omit({ ...state }, 'form');
    copy.auth = omit(copy.auth, 'hasErrored', 'error');
    const serializedState = JSON.stringify(copy);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

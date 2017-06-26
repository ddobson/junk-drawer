export function getInitialState() {
  return {
    auth: {
      isAuthenticated: false,
      isLoading: false,
      hasErrored: false,
      error: '',
    },
  };
}

export function loadSerializedState() {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return getInitialState();
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return getInitialState();
  }
}

export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

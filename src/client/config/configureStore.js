import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    predicate(getState, action) {
      const ignoredActions = [
        // Discard redux form actions
        '@@redux-form/FOCUS',
        '@@redux-form/CHANGE',
        '@@redux-form/BLUR',
      ];

      return !ignoredActions.includes(action.type);
    },
  });
  middlewares.push(logger);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
}

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './client/containers/App';
import Authentication from './client/containers/Authentication';
import Dashboard from './client/containers/Dashboard';
import Navigation from './client/containers/Navigation';
import ProtectedRoute from './client/containers/ProtectedRoute';

import configureStore from './client/config/configureStore';
import { loadSerializedState, saveState } from './client/config/localStorage';
import registerServiceWorker from './client/config/registerServiceWorker';
import './client/styles/index.scss';

const store = configureStore(loadSerializedState());

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/signin" component={Authentication} />
          <Route path="/signup" component={Authentication} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();

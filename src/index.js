import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './client/containers/App';
import Navigation from './client/containers/Navigation';
import Authentication from './client/containers/Authentication';
import configureStore from './client/config/configureStore';
import getInitialState from './client/config/getInitialState';
import registerServiceWorker from './client/config/registerServiceWorker';
import './client/styles/index.scss';

const store = configureStore(getInitialState());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/signin" component={Authentication} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();

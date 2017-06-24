import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './client/containers/App';
import configureStore from './client/config/configureStore';
import getInitialState from './client/config/getInitialState';
import registerServiceWorker from './client/config/registerServiceWorker';
import './client/styles/index.scss';

const store = configureStore(getInitialState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();

import React from 'react';
import { render } from 'react-dom';
import Root from 'containers/Root';
import { configureStore, history } from 'redux/store/configureStore';

const { store, persistor } = configureStore();

render(
  <Root store={store} history={history} persistor={persistor} />,
  document.getElementById('root'),
);

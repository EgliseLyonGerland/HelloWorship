// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { CssBaseline, createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { PersistGate } from 'redux-persist/integration/react';
import type { Persistor } from 'redux-persist/lib/types';
import type { Store } from 'redux/types';
import Routes from '../Routes';

type Props = {
  store: Store,
  history: {},
  persistor: Persistor,
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#322E3C',
    },
    background: {
      default: '#322E3C',
    },
    type: 'dark',
  },
});

export default class Root extends Component<Props> {
  render() {
    const { store, history, persistor } = this.props;
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedRouter history={history}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Routes />
            </ThemeProvider>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    );
  }
}

// @flow
import React from 'react';
import { hot } from 'react-hot-loader/root';
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

const primary = {
  light: '#5c5766',
  main: '#322E3C',
  dark: '#25222B',
};

const theme = createMuiTheme({
  palette: {
    primary,
    background: {
      default: primary.main,
      paper: primary.dark,
    },
    misc: {
      activeItem: '#F9B74F',
    },
    type: 'dark',
  },
});

export default hot((props: Props) => {
  const { store, history, persistor } = props;

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
});

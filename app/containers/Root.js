// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { CssBaseline, createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import type { Store } from 'redux/reducers/types';
import Routes from '../Routes';

type Props = {
  store: Store,
  history: {},
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
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes />
          </ThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

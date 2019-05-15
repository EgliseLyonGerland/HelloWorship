import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import Store from 'electron-store';

import { createStorage } from 'services/storage';
import createRootReducer from 'redux/reducers';
import * as slidesActions from 'redux/actions/slides';
import type { State, Action } from 'redux/types';

const persistConfig = {
  key: 'root',
  storage: createStorage(new Store()),
};

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const persistedReducer: (State, Action) => State = persistReducer(
  persistConfig,
  rootReducer,
);

const configureStore = (initialState?: State) => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Thunk Middleware
  middleware.push(thunk);

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger);
  }

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);

  // Redux DevTools Configuration
  const actionCreators = {
    ...slidesActions,
    ...routerActions,
  };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://extension.remotedev.io/docs/API/Arguments.html
        actionCreators,
      })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(persistedReducer, initialState, enhancer);
  const persistor = persistStore(store);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(persistReducer(persistConfig, nextRootReducer));
    });
  }

  return { store, persistor };
};

export default { configureStore, history };

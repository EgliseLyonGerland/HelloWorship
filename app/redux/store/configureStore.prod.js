// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import type { StoreEnhancer } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import Store from 'electron-store';

import { createStorage } from 'services/storage';
import createRootReducer from 'redux/reducers';
import rootSagas from 'redux/sagas';
import type { CombinedReducer, State, Action } from 'redux/types';

const persistConfig = {
  key: 'root',
  storage: createStorage(new Store()),
  whitelist: ['slides'],
};

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const sagaMiddleware = createSagaMiddleware();
const persistedReducer: (State, Action) => State = persistReducer<
  State,
  Action,
>(persistConfig, rootReducer);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(sagaMiddleware, thunk, router);

function configureStore(initialState?: State) {
  const store = createStore<CombinedReducer, State, StoreEnhancer<*, *, *>>(
    persistedReducer,
    initialState,
    enhancer,
  );

  const persistor = persistStore(store);

  sagaMiddleware.run(rootSagas);

  return { store, persistor };
}

export default { configureStore, history };

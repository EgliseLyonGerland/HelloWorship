// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import type { StoreEnhancer } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import Store from 'electron-store';

import { createStorage } from 'services/storage';
import createRootReducer from 'redux/reducers';
import type { CombinedReducer, State, Action } from 'redux/types';

const persistConfig = {
  key: 'root',
  storage: createStorage(new Store()),
};

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const persistedReducer: (State, Action) => State = persistReducer<
  State,
  Action,
>(persistConfig, rootReducer);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

function configureStore(initialState?: State) {
  const store = createStore<CombinedReducer, State, StoreEnhancer<*, *, *>>(
    persistedReducer,
    initialState,
    enhancer,
  );

  const persistor = persistStore(store);

  return { store, persistor };
}

export default { configureStore, history };

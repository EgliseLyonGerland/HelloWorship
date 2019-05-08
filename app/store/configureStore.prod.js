// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import type { StoreEnhancer } from 'redux';
import createRootReducer from '../reducers';
import type { CombinedReducer, counterStateType } from '../reducers/types';

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

function configureStore(initialState?: counterStateType) {
  return createStore<CombinedReducer, counterStateType, StoreEnhancer<*, *, *>>(
    rootReducer,
    initialState,
    enhancer
  );
}

export default { configureStore, history };

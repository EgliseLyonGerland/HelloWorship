// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import type { HashHistory } from 'history';
import counter from './counter';
import type { Reducers, Action, CombinedReducer } from './types';

export default function createRootReducer(
  history: HashHistory
): CombinedReducer {
  return combineReducers<Reducers, Action>({
    router: connectRouter(history),
    counter
  });
}

// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import type { HashHistory } from 'history';
import type { Reducers, Action, CombinedReducer } from '../types';
import slides from './slides';
import currentSlide from './currentSlide';

export default function createRootReducer(
  history: HashHistory,
): CombinedReducer {
  return combineReducers<Reducers, Action>({
    router: connectRouter(history),
    slides,
    currentSlide,
  });
}

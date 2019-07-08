// @flow

import type {
  Dispatch as ReduxDispatch,
  Reducer as ReduxReducer,
  Store as ReduxStore,
  CombinedReducer as ReduxCombinedReducer,
} from 'redux';

import type { PersistState } from 'redux-persist/src/types';

export type Reducers = {
  router: ReduxReducer<>,
  slides: ReduxReducer<number, Action>,
};

export type CombinedReducer = ReduxCombinedReducer<Reducers, Action>;

export type AbstractSlide = {
  id: string,
};

export type RegularSlide = AbstractSlide & {
  templateId: string,
  backgroundId: string,
  data: {
    [string]: number,
  },
};

export type SlidesState = Array<RegularSlide>;

export type CurrentSlideState = RegularSlide;

export type State = {
  +slides: SlidesState,
  _persist: PersistState,
};

export type Action = {
  +type: string,
};

export type GetState = () => State;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;

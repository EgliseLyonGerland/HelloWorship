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

export type Song = {
  title: string,
  author: string,
  copyright: string,
};

export type SlideType = 'regular' | 'song';

export type AbstractSlide = {
  id: string,
};

export type RegularSlide = AbstractSlide & {
  type: 'regular',
  templateId: string,
  backgroundId: string,
  data: {
    [string]: number,
  },
};

export type SongSlide = AbstractSlide & {
  type: 'song',
  gradientId: string,
  songId: string,
  overrides: Song,
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

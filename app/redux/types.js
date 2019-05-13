import type {
  Dispatch as ReduxDispatch,
  Reducer as ReduxReducer,
  Store as ReduxStore,
  CombinedReducer as ReduxCombinedReducer,
} from 'redux';

export type Reducers = {
  router: ReduxReducer<>,
  slides: ReduxReducer<number, Action>,
};

export type CombinedReducer = ReduxCombinedReducer<Reducers, Action>;

export type Slide = mixed;

export type SlidesState = Array<Slide>;

export type State = {
  +slides: SlidesState,
};

export type Action = {
  +type: string,
};

export type GetState = () => State;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;

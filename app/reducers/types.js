import type {
  Dispatch as ReduxDispatch,
  Reducer as ReduxReducer,
  Store as ReduxStore,
  CombinedReducer as ReduxCombinedReducer
} from 'redux';

export type Reducers = {
  router: ReduxReducer<>,
  counter: ReduxReducer<number, Action>
};

export type CombinedReducer = ReduxCombinedReducer<Reducers, Action>;

export type counterStateType = {
  +counter: number
};

export type Action = {
  +type: string
};

export type GetState = () => counterStateType;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;

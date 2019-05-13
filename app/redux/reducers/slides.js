// @flow
import { SLIDES_ADD } from 'redux/actions/slides';
import type { Action, SlidesState } from '../types';

export default function slides(state: SlidesState = [], action: Action) {
  switch (action.type) {
    case SLIDES_ADD:
      return [...state, action.slide];
    default:
      return state;
  }
}

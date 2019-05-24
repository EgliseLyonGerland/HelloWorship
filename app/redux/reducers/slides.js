// @flow
import { SLIDES_ADD, SLIDES_REPLACE } from 'redux/actions/slides';
import type { Action, SlidesState } from '../types';

export default function slides(state: SlidesState = [], action: Action) {
  switch (action.type) {
    case SLIDES_ADD:
      state.splice(action.position, 0, action.slide);

      return [...state];
    case SLIDES_REPLACE:
      return [
        ...state.map(slide => {
          if (action.slide.id === slide.id) {
            return action.slide;
          }

          return slide;
        }),
      ];
    default:
      return state;
  }
}

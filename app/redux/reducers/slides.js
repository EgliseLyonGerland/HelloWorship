// @flow
import {
  SLIDES_ADD,
  SLIDES_REPLACE,
  SLIDES_DELETE,
} from 'redux/actions/slides';
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
    case SLIDES_DELETE:
      return [...state.filter(slide => slide.id !== action.slideId)];

    default:
      return state;
  }
}

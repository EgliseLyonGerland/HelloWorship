// @flow
import { CURRENT_SLIDE_SET } from 'redux/actions/currentSlide';
import type { Action, CurrentSlideState } from '../types';

export default function currentSlide(
  state: CurrentSlideState = null,
  action: Action,
) {
  switch (action.type) {
    case CURRENT_SLIDE_SET:
      return { ...action.slide };
    default:
      return state;
  }
}

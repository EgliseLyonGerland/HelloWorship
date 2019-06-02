// @flow
import set from 'immutable-set';

import {
  CURRENT_SLIDE_SET,
  CURRENT_SLIDE_SAVE,
  CURRENT_SLIDE_UPDATE_FIELD,
} from 'redux/actions/currentSlide';
import type { Action, CurrentSlideState } from '../types';

export default function currentSlide(
  state: CurrentSlideState = null,
  action: Action,
) {
  switch (action.type) {
    case CURRENT_SLIDE_SET:
      return { ...action.slide };
    case CURRENT_SLIDE_UPDATE_FIELD:
      return set(state, ['data', action.name], action.value);
    case CURRENT_SLIDE_SAVE:
    default:
      return state;
  }
}

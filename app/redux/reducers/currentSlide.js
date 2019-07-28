// @flow
import set from 'immutable-set';

import {
  CURRENT_SLIDE_SET,
  CURRENT_SLIDE_SAVE,
  CURRENT_SLIDE_UPDATE_TEMPLATE,
  CURRENT_SLIDE_UPDATE_BACKGROUND,
  CURRENT_SLIDE_UPDATE_GRADIENT,
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
    case CURRENT_SLIDE_UPDATE_TEMPLATE:
      return set(state, 'templateId', action.templateId);
    case CURRENT_SLIDE_UPDATE_BACKGROUND:
      return set(state, 'backgroundId', action.backgroundId);
    case CURRENT_SLIDE_UPDATE_GRADIENT:
      return set(state, 'gradientId', action.gradientId);
    case CURRENT_SLIDE_UPDATE_FIELD:
      if (state.type === 'song') {
        return set(state, ['overrides', action.name], action.value);
      }

      return set(state, ['data', action.name], action.value);
    case CURRENT_SLIDE_SAVE:
    default:
      return state;
  }
}

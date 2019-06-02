// @flow
import find from 'lodash/find';
import type { Dispatch, GetState, SlidesState } from 'redux/types';

export const CURRENT_SLIDE_SET = 'currentSlide/SET';
export const CURRENT_SLIDE_SAVE = 'currentSlide/SAVE';
export const CURRENT_SLIDE_UPDATE_FIELD = 'currentSlide/UPDATE_FIELD';

export function setCurrentSlide(slideId: string) {
  return (dispatch: Dispatch, getState: GetState) => {
    const {
      slides,
    }: {
      slides: SlidesState,
    } = getState();

    dispatch({
      type: CURRENT_SLIDE_SET,
      slide: find(slides, ['id', slideId]),
    });
  };
}

export function saveCurrentSlide() {
  return {
    type: CURRENT_SLIDE_SAVE,
  };
}

export function updateCurrentSlideField(name: string, value: mixed) {
  return {
    type: CURRENT_SLIDE_UPDATE_FIELD,
    name,
    value,
  };
}

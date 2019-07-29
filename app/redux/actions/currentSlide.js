// @flow
import find from 'lodash/find';
import type { Dispatch, GetState, SlidesState } from 'redux/types';

export const CURRENT_SLIDE_SET = 'currentSlide/SET';
export const CURRENT_SLIDE_SAVE = 'currentSlide/SAVE';
export const CURRENT_SLIDE_UPDATE_TEMPLATE = 'currentSlide/UPDATE_TEMPLATE';
export const CURRENT_SLIDE_UPDATE_BACKGROUND = 'currentSlide/UPDATE_BACKGROUND';
export const CURRENT_SLIDE_UPDATE_GRADIENT = 'currentSlide/UPDATE_GRADIENT';
export const CURRENT_SLIDE_UPDATE_SONG = 'currentSlide/UPDATE_SONG';
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

export function updateCurrentSlideTemplate(templateId: string) {
  return {
    type: CURRENT_SLIDE_UPDATE_TEMPLATE,
    templateId,
  };
}

export function updateCurrentSlideBackground(backgroundId: string) {
  return {
    type: CURRENT_SLIDE_UPDATE_BACKGROUND,
    backgroundId,
  };
}

export function updateCurrentSlideGradient(gradientId: string) {
  return {
    type: CURRENT_SLIDE_UPDATE_GRADIENT,
    gradientId,
  };
}

export function updateCurrentSlideSong(songId: string) {
  return {
    type: CURRENT_SLIDE_UPDATE_SONG,
    songId,
  };
}

export function updateCurrentSlideField(name: string, value: mixed) {
  return {
    type: CURRENT_SLIDE_UPDATE_FIELD,
    name,
    value,
  };
}

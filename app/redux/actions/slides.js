// @flow
import uuid from 'uuid/v1';
import findIndex from 'lodash/findIndex';

import templates from 'assets/templates';
import backgrounds from 'assets/backgrounds';
import type { Slide, SlidesState, Dispatch, GetState } from 'redux/types';

export const SLIDES_ADD = 'slides/ADD';
export const SLIDES_REPLACE = 'slides/REPLACE';
export const SLIDES_DELETE = 'slides/DELETE';

export function addDefaultSlide(position?: number) {
  const slide = {
    id: uuid(),
    templateId: Object.keys(templates)[0],
    backgroundId: Object.keys(backgrounds)[0],
  };

  return addSlide(slide, position);
}

export function addSlide(slide: Slide, position?: number) {
  return async (dispatch: Dispatch, getState: GetState) => {
    const {
      slides,
    }: {
      slides: SlidesState,
    } = getState();

    dispatch({
      type: SLIDES_ADD,
      position: position || slides.length,
      slide,
    });
  };
}

export function replaceSlide(slide: Slide) {
  return {
    type: SLIDES_REPLACE,
    slide,
  };
}

export function deleteSlide(slideId: string) {
  return async (dispatch: Dispatch, getState: GetState) => {
    const {
      slides,
    }: {
      slides: SlidesState,
    } = getState();

    dispatch({
      type: SLIDES_DELETE,
      slideId,
      position: findIndex(slides, ['id', slideId]),
    });
  };
}

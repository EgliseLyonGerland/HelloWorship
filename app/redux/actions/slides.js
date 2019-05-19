// @flow
import uuid from 'uuid/v1';
import templates from 'templates/';
import backgrounds from 'images/backgrounds';
import { setCurrentSlide } from 'redux/actions/currentSlide';
import type { Slide, SlidesState, Dispatch, GetState } from 'redux/types';

export const SLIDES_ADD = 'slides/ADD';

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

    await dispatch({
      type: SLIDES_ADD,
      position: position || slides.length,
      slide,
    });

    dispatch(setCurrentSlide(slide.id));
  };
}

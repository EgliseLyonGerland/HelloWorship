// @flow
import uuid from 'uuid/v1';
import findIndex from 'lodash/findIndex';

import templates from 'assets/templates';
import backgrounds from 'assets/backgrounds';
import gradients from 'assets/gradients';
import songs from 'assets/songs';
import type {
  AbstractSlide,
  RegularSlide,
  SongSlide,
  SlidesState,
  Dispatch,
  GetState,
} from 'redux/types';

export const SLIDES_ADD = 'slides/ADD';
export const SLIDES_REPLACE = 'slides/REPLACE';
export const SLIDES_DELETE = 'slides/DELETE';

export function addDefaultRegularSlide(position?: number) {
  const slide: RegularSlide = {
    id: uuid(),
    type: 'regular',
    templateId: Object.keys(templates)[0],
    backgroundId: Object.keys(backgrounds)[0],
    data: {},
  };

  return addSlide(slide, position);
}

export function addDefaultSongSlide(position?: number) {
  const songId = Object.keys(songs)[0];
  const gradientId = Object.keys(gradients)[0];

  const slide: SongSlide = {
    id: uuid(),
    type: 'song',
    gradientId,
    songId,
    overrides: songs[songId],
  };

  return addSlide(slide, position);
}

export function addSlide(slide: AbstractSlide, position?: number) {
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

export function replaceSlide(slide: AbstractSlide) {
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

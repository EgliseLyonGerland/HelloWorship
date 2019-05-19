// @flow
import find from 'lodash/find';
import type { Dispatch, GetState, SlidesState } from 'redux/types';

export const CURRENT_SLIDE_SET = 'currentSlide/SET';

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

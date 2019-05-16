// @flow
export const CURRENT_SLIDE_SET = 'CURRENT_SLIDE_SET';

export function setCurrentSlide(slideId: string) {
  return {
    type: CURRENT_SLIDE_SET,
    slideId,
  };
}

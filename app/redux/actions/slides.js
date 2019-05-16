// @flow
import uuid from 'uuid/v1';
import templates from 'templates/';

export const SLIDES_ADD = 'SLIDES_ADD';

export function addDefaultSlide(position: number = 0) {
  return {
    type: SLIDES_ADD,
    position,
    slide: {
      id: uuid(),
      templateId: Object.keys(templates)[0],
    },
  };
}

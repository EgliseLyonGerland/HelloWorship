// @flow
import uuid from 'uuid/v1';
import templates from 'templates/';

export const SLIDES_ADD = 'SLIDES_ADD';

export function addDefaultSlide() {
  return {
    type: SLIDES_ADD,
    slide: {
      id: uuid(),
      templateId: Object.keys(templates)[0],
    },
  };
}

// @flow
import React from 'react';
import get from 'lodash/get';

import type { Template } from 'utils/types';

import { createFlexbox } from './elements/Flexbox';
import { createTextElement } from './elements/Text';
import { createDivider } from './elements/Divider';

type Props = {
  template: Template,
  background: string,
  data: {},
};

export default function ArtBoard({ template, background, data }: Props) {
  function getElementValue({ bind }) {
    const placeholder = get(template, ['form', bind, 'placeholder'], 'Empty');

    return get(data, bind, placeholder);
  }

  function renderFlex({ elements, ...options }) {
    return createFlexbox({
      ...options,
      children: renderElements(elements),
    });
  }

  function renderText(element) {
    return createTextElement({
      ...element,
      text: getElementValue(element),
    });
  }

  function renderDivider(element) {
    return createDivider(element);
  }

  function renderElements(elements) {
    return elements.map((element, index) =>
      renderElement({
        ...element,
        key: index,
      }),
    );
  }

  function renderElement(element) {
    switch (element.type) {
      case 'text':
        return renderText(element);
      case 'flex':
        return renderFlex(element);
      case 'divider':
        return renderDivider(element);
      default:
        return null;
    }
  }

  const style = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
  };

  return (
    <div style={style}>
      <svg
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        fillRule="evenodd"
        fill="none"
        stroke="none"
        strokeLinecap="square"
        strokeMiterlimit={10}
        overflow="hidden"
        preserveAspectRatio="none"
        width="100%"
        viewBox="0 0 1920 1080"
        style={{ display: 'block' }}
      >
        {renderElements(template.elements)}
      </svg>
    </div>
  );
}

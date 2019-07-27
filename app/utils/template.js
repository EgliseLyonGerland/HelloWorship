import get from 'lodash/get';

function getElementValue(template, data, { bind }) {
  const placeholder = get(
    template,
    ['form', bind, 'placeholder'],
    'Lorem Ipsum',
  );
  const datum = get(data, bind);

  return datum || placeholder;
}

function bindDataToTemplate(template, data) {
  const elements = template.elements.map(element => {
    if (element.bind) {
      return {
        ...element,
        value: getElementValue(template, data, element),
      };
    }

    if (element.elements) {
      return bindDataToTemplate(element, data);
    }

    return element;
  });

  return {
    ...template,
    elements,
  };
}

export { bindDataToTemplate };
export default null;

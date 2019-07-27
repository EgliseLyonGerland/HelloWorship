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
  const mapElements = elements =>
    elements.map(element => {
      if (element.bind) {
        return {
          ...element,
          value: getElementValue(template, data, element),
        };
      }

      if (element.elements) {
        return {
          ...element,
          elements: mapElements(element.elements, data),
        };
      }

      return element;
    });

  return {
    ...template,
    elements: mapElements(template.elements),
  };
}

function createSongTemplate({ title }) {
  return {
    elements: [
      {
        type: 'flex',
        width: 1920,
        height: 1080,
        spacing: 16,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        elements: [
          {
            type: 'text',
            value: title,
            fontSize: 72,
            fontWeight: 900,
          },
          {
            type: 'text',
            value: title,
            fontSize: 40,
            fontWeight: 500,
          },
        ],
      },
    ],
  };
}

export { bindDataToTemplate, createSongTemplate };

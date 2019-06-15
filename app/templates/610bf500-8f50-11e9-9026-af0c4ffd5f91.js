export default {
  id: '610bf500-8f50-11e9-9026-af0c4ffd5f91',
  elements: [
    {
      type: 'flex',
      width: 1920,
      height: 1080,
      spacing: 80,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      elements: [
        {
          type: 'text',
          bind: 'title',
          fontSize: 90,
          fontWeight: 900,
        },
        {
          type: 'divider',
        },
        {
          type: 'text',
          bind: 'text',
          width: 1200,
          fontSize: 80,
          fontFamily: 'EB Garamond',
          fontStyle: 'italic',
          fontWeight: 600,
          textAlign: 'center',
        },
      ],
    },
  ],
  form: {
    title: {
      type: 'text',
      label: 'Title',
      placeholder: 'Lorem ipsum',
    },
    text: {
      type: 'text',
      label: 'Text',
      multiline: true,
      placeholder:
        '“ Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi commodo nulla mattis dolor. ”',
    },
  },
};

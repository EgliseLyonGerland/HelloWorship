export default {
  id: '4b6860a0-8f53-11e9-90b0-8bab6e1f8319',
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
          type: 'flex',
          alignItems: 'flex-end',
          spacing: 24,
          elements: [
            {
              type: 'text',
              bind: 'title',
              fontSize: 90,
              fontWeight: 900,
            },
            {
              type: 'text',
              bind: 'subtitle',
              fontSize: 80,
              fontWeight: 600,
            },
          ],
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
    subtitle: {
      type: 'text',
      label: 'Subtitle',
      placeholder: 'Dolor sit',
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

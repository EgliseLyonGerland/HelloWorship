export default {
  id: '6a985eb0-8f5a-11e9-a8be-ebc3b63d6cf3',
  elements: [
    {
      type: 'flex',
      width: 1920,
      height: 1080,
      alignItems: 'center',
      justifyContent: 'center',
      elements: [
        {
          type: 'flex',
          alignItems: 'center',
          spacing: 96,
          elements: [
            {
              type: 'text',
              bind: 'title',
              fontSize: 90,
              fontWeight: 900,
            },
            {
              type: 'divider',
              vertical: true,
            },
            {
              type: 'text',
              bind: 'text',
              width: 960,
              fontSize: 80,
              fontFamily: 'EB Garamond',
              fontStyle: 'italic',
              fontWeight: 600,
            },
          ],
        },
      ],
    },
  ],
  form: {
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
          '“ Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi commodo nulla mattis dolor sagittis semper maecenas. ”',
      },
    },
  },
};

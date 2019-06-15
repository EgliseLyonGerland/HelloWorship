export default {
  id: 'd4ddfc90-8f59-11e9-9397-570ec7f8061c',
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
              type: 'flex',
              flexDirection: 'column',
              width: 400,
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
                  fontWeight: 500,
                },
              ],
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
    title: {
      type: 'text',
      label: 'Title',
      placeholder: 'Lorem ipsum',
    },
    subtitle: {
      type: 'text',
      label: 'Subtitle',
      placeholder: 'Dolor sit amet',
    },
    text: {
      type: 'text',
      label: 'Text',
      multiline: true,
      placeholder:
        '“ Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi commodo nulla mattis dolor sagittis semper maecenas. ”',
    },
  },
};

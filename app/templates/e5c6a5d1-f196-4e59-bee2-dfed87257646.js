export default {
  id: 'e5c6a5d1-f196-4e59-bee2-dfed87257646',
  elements: [
    {
      key: 'title',
      type: 'text',
      fontSize: 90,
      fontWeight: 900,
      top: '50%',
      left: '50%',
    },
    {
      key: 'baseline',
      type: 'text',
      fontSize: 60,
      fontWeight: 400,
      top: '60%',
      left: '50%',
    },
  ],
  form: {
    title: {
      type: 'text',
      label: 'Title',
      placeholder: 'Lorem ipsum',
    },
    baseline: {
      type: 'text',
      label: 'Baseline',
      multiline: true,
      placeholder:
        'Interdum et malesuada fames ac ante ipsum primis in faucibus',
    },
  },
};

const context = require.context('.', false, /\.js$/);
const templates = {};

context.keys().forEach(key => {
  const matches = /^\.\/(.+?)\.js$/.exec(key);
  const templateId = matches[1];

  if (templateId === 'index') {
    return;
  }

  templates[templateId] = context(key).default;
});

export default templates;

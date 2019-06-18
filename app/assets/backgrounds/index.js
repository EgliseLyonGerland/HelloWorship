const context = require.context('.', false, /\.jpg$/);
const templates = {};

context.keys().forEach(key => {
  const matches = /^\.\/(.+?)\.jpg$/.exec(key);
  const backgroundId = matches[1];

  if (backgroundId === 'index') {
    return;
  }

  templates[backgroundId] = context(key);
});

export default templates;

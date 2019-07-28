import { parseLyrics } from '../../../app/utils/song';

function transformHeader(content) {
  return content
    .trim()
    .split('\n')
    .reduce((acc, line) => {
      let [key, value] = line.split(':');

      key = key.trim();
      value = value.trim();

      return {
        ...acc,
        [key]: value,
      };
    }, {});
}

function transform(content) {
  const [header, lyrics] = content.split('---');

  return {
    ...transformHeader(header),
    lyrics: parseLyrics(lyrics),
  };
}

function loader(content) {
  // eslint-disable-next-line no-unused-expressions
  this.cacheable && this.cacheable();
  // this.value = content;
  const song = transform(content);

  return `module.exports = ${JSON.stringify(song)}`;
}

module.exports = loader;
module.exports.seperable = true;

function isBlankLine(text) {
  return text.trim() === '';
}

function isTypeLine(text) {
  const trimedText = text.trim();

  return trimedText === '[verse]' || trimedText === '[chorus]';
}

function resolveType(text) {
  return text.substr(1, text.length - 2);
}

export function stringifyLyrics(lyrics) {
  return lyrics
    .map(part => `[${part.type}]\n${part.lines.join('\n')}`)
    .join('\n\n');
}

export function parseLyrics(text) {
  let currentType = 'verse';

  return text
    .trim()
    .split('\n')
    .reduce((acc, curr) => {
      if (acc.length === 0 || isBlankLine(curr)) {
        return [...acc, { type: currentType, lines: [] }];
      }

      if (isTypeLine(curr)) {
        currentType = resolveType(curr);

        if (acc[acc.length - 1].lines.length) {
          return [...acc, { type: currentType, lines: [] }];
        }

        acc[acc.length - 1].type = currentType;

        return acc;
      }

      acc[acc.length - 1].lines.push(curr);

      return acc;
    }, []);
}

export default null;

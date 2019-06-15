// @flow
import React from 'react';
// import { animated, useTrail } from 'react-spring';
import { SLIDE_WIDTH } from 'constants/config';
import isString from 'lodash/isString';

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

const defaultFontSize = 60;
const defaultLineHeight = 1.3;
const defaultFontFamily = 'Source Sans Pro';
const defaultFontWeight = 500;
const defaultFontStyle = 'normal';

type TextData = {
  text: string,
  lines: Array<string>,
  width: number,
  height: number,
};

type Props = {
  text: string | TextData,
  fontSize: number,
  fontFamily: 'Source Sans Pro' | 'EB Garamond',
  fontWeight: 400 | 500 | 700 | 900,
  fontStyle: 'normal' | 'italic',
  lineHeight: number,
  textAlign: 'left' | 'right' | 'center',
  width: number,
  // height: number,
};

function getLineHeightInPx({
  fontSize = defaultFontSize,
  lineHeight = defaultLineHeight,
}) {
  return fontSize * lineHeight;
}

function getTextWidth(
  text,
  {
    fontSize = defaultFontSize,
    fontFamily = defaultFontFamily,
    fontWeight = defaultFontWeight,
    fontStyle = defaultFontStyle,
  },
) {
  context.save();
  context.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
  const { width } = context.measureText(text);
  context.restore();

  return width;
}

function getData(
  text,
  {
    width = SLIDE_WIDTH,
    fontSize = defaultFontSize,
    fontFamily = defaultFontFamily,
    fontWeight = defaultFontWeight,
    fontStyle = defaultFontStyle,
    lineHeight = defaultLineHeight,
  },
) {
  const data = {
    text,
    lines: [],
    width: 0,
    height: 0,
  };

  const words = text.split(' ');
  const spaceWidth = getTextWidth(' ', {
    fontSize,
    fontFamily,
    fontWeight,
    fontStyle,
  });

  let currentWidth = 0;
  let currentLine = [];
  let currentWord = words.shift();

  while (currentWord) {
    const wordWidth = getTextWidth(currentWord, {
      fontSize,
      fontFamily,
      fontWeight,
      fontStyle,
    });

    if (currentLine.length && currentWidth + wordWidth > width) {
      data.lines.push(currentLine.join(' '));
      data.width = Math.max(currentWidth - spaceWidth, data.width);

      currentWidth = 0;
      currentLine = [];
    }

    currentLine.push(currentWord);
    currentWidth += wordWidth + spaceWidth;
    currentWord = words.shift();
  }

  data.lines.push(currentLine.join(' '));
  data.width = Math.max(currentWidth, data.width);
  data.height = data.lines.length * getLineHeightInPx({ fontSize, lineHeight });

  return data;
}

export function createTextElement({ text, ...options }: Props) {
  const data = getData(text, options);

  return (
    <Text text={data} {...options} width={data.width} height={data.height} />
  );
}

export default function Text({
  text,
  fontSize = defaultFontSize,
  fontFamily = defaultFontFamily,
  fontWeight = defaultFontWeight,
  fontStyle = defaultFontStyle,
  lineHeight = defaultLineHeight,
  textAlign = 'left',
  width = SLIDE_WIDTH,
}: Props) {
  let data = text;

  if (isString(data)) {
    data = getData(data, {
      width,
      fontSize,
      fontFamily,
      fontWeight,
      fontStyle,
      lineHeight,
    });
  }

  // const chars = Array.from(data.text);

  // const [trail, set] = useTrail(data.text.length, () => ({
  //   immediate: true,
  //   opacity: 0,
  //   config: {
  //     mass: 1,
  //     tension: chars.length * 150,
  //     friction: chars.length * 3,
  //   },
  // }));

  let x = 0;
  const y = 0;
  let textAnchor = 'inherit';

  switch (textAlign) {
    case 'center':
      textAnchor = 'middle';
      x = width / 2;
      break;
    case 'right':
      textAnchor = 'end';
      x = width;
      break;
    default:
  }

  // set({ opacity: 1 });

  return (
    <text
      width={data.width}
      height={data.height}
      style={{
        fontSize,
        fontWeight,
        fontStyle,
        lineHeight,
        fontFamily,
        fill: '#FFFFFF',
      }}
      dominantBaseline="text-before-edge"
      textRendering="geometricPrecision"
      textAnchor={textAnchor}
      transform={`translate(${x} ${y})`}
    >
      {data.lines.map((line, index) => (
        <tspan
          key={line}
          width={width}
          height={lineHeight * fontSize}
          x={0}
          dy={index ? lineHeight * fontSize : 0}
        >
          {line}
          {/* trail.splice(0, line.length).map((style, index2) => (
            <animated.tspan key={index2} style={style}>
              {line[index2]}
            </animated.tspan>
          )) */}
        </tspan>
      ))}
    </text>
  );
}

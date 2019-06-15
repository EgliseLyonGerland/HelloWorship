// @flow
import React from 'react';

type Props = {
  // width: number,
  // height: number,
  spacing: number,
  flexDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse',
  alignItems: 'flex-start' | 'flex-end' | 'center',
  justifyContent:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly',
  children: Node,
};

function isColumnDirection(flexDirection) {
  return flexDirection === 'column' || flexDirection === 'column-reverse';
}

function getDimensions(children) {
  let x = 0;
  let y = 0;

  return React.Children.toArray(children).map(child => {
    const { width, height } = child.props;
    const dimensions = [width, height, x, y];

    x += child.props.width;
    y += child.props.height;

    return dimensions;
  });
}

function getTotalDimension(dimensions, spacing, flexDirection) {
  const { length } = dimensions;
  const column = isColumnDirection(flexDirection);

  return column
    ? dimensions.reduce(
        (acc, [width, height]) => [Math.max(acc[0], width), acc[1] + height],
        [0, spacing * (length - 1)],
      )
    : dimensions.reduce(
        (acc, [width, height]) => [acc[0] + width, Math.max(acc[1], height)],
        [spacing * (length - 1), 0],
      );
}

function getData(options: Props) {
  const {
    children,
    spacing = 0,
    flexDirection = 'row',
    width = 0,
    height = 0,
  } = options;

  const dimensions = getDimensions(children);
  const [contentWidth, contentHeight] = getTotalDimension(
    dimensions,
    spacing,
    flexDirection,
  );

  return {
    dimensions,
    contentWidth,
    contentHeight,
    width: Math.max(width, contentWidth),
    height: Math.max(height, contentHeight),
  };
}

export function createFlexbox(options: Props) {
  const { width, height } = getData(options);

  return <Flexbox {...options} width={width} height={height} />;
}

export default function Flexbox(props: Props) {
  const {
    children,
    spacing = 0,
    flexDirection = 'row',
    alignItems = 'flex-start',
    justifyContent = 'flex-start',
  } = props;

  const { dimensions, contentWidth, contentHeight, width, height } = getData(
    props,
  );

  function getAlignItemsPosition(index, value) {
    let wrapperSize = width;
    let itemSize = dimensions[index][0];

    if (value === 'y') {
      wrapperSize = height;
      [, itemSize] = dimensions[index];
    }

    if (alignItems === 'center') {
      return (wrapperSize - itemSize) / 2;
    }

    if (alignItems === 'flex-end') {
      return wrapperSize - itemSize;
    }

    return 0;
  }

  function getJustifyContentPosition(index, value) {
    let wrapperSize = width;
    let contentSize = contentWidth;
    let defaultPosition = dimensions[index][2] + index * spacing;

    if (value === 'y') {
      wrapperSize = height;
      contentSize = contentHeight;
      defaultPosition = dimensions[index][3] + index * spacing;
    }

    if (justifyContent === 'flex-end') {
      return wrapperSize - contentSize + defaultPosition;
    }

    if (justifyContent === 'center') {
      return (wrapperSize - contentSize) / 2 + defaultPosition;
    }

    if (justifyContent === 'space-between') {
      const space = (wrapperSize - contentSize) / (dimensions.length - 1);
      return space * index + defaultPosition;
    }

    if (justifyContent === 'space-around') {
      const space = (wrapperSize - contentSize) / dimensions.length;
      return space / 2 + space * index + defaultPosition;
    }

    if (justifyContent === 'space-evenly') {
      const space = (wrapperSize - contentSize) / (dimensions.length + 1);
      return space * (index + 1) + defaultPosition;
    }

    return defaultPosition;
  }

  function getX(index) {
    if (isColumnDirection(flexDirection)) {
      return getAlignItemsPosition(index, 'x');
    }

    return getJustifyContentPosition(index, 'x');
  }

  function getY(index) {
    if (isColumnDirection(flexDirection)) {
      return getJustifyContentPosition(index, 'y');
    }

    return getAlignItemsPosition(index, 'y');
  }

  return (
    <g width={width} height={height}>
      {React.Children.map(children, (child, index) => (
        <g
          width={dimensions[index][0]}
          height={dimensions[index][1]}
          transform={`translate(${getX(index)} ${getY(index)})`}
        >
          {child}
        </g>
      ))}
    </g>
  );
}

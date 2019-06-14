// @flow
import React from 'react';
import dividerHorizontal from 'images/divider-horizontal.png';
import dividerVertical from 'images/divider-vertical.png';

const WIDTH = 8;
const HEIGHT = 581;

type Props = {
  vertical: boolean,
};

export function createDivider(options: Props) {
  const { vertical } = options;

  return (
    <Divider
      {...options}
      width={vertical ? WIDTH : HEIGHT}
      height={vertical ? HEIGHT : WIDTH}
    />
  );
}

export default function Divider({ vertical = false }: Props) {
  return (
    <image
      width={vertical ? WIDTH : HEIGHT}
      height={vertical ? HEIGHT : WIDTH}
      href={vertical ? dividerVertical : dividerHorizontal}
    />
  );
}

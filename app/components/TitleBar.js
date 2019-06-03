import React from 'react';
import { styled } from '@material-ui/styles';

const Root = styled('div')(({ theme: { palette } }) => ({
  background: palette.primary.dark,
  height: 24,
  minHeight: 24,
  borderBottom: [[1, 'black', 'solid']],
  '-webkit-app-region': 'drag',
}));

export default () => <Root />;

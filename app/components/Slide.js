// @flow
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import classnames from 'classnames';
import templates from 'assets/templates';
import backgrounds from 'assets/backgrounds';
import type { SlideState, Slide as SlideType } from 'redux/types';

import Artboard from 'components/Artboard';

type Props = {
  slide: SlideState,
  elevation?: number,
  editing?: boolean,
  onClick?: (slide: SlideType) => void,
};

const width = 1920;
const height = 1080;

const useStyles = makeStyles(
  theme => ({
    root: {
      position: 'relative',
      border: [['solid', 1, 'rgba(255, 255, 255, 0.6)']],
    },
    editing: {
      borderColor: theme.palette.misc.activeItem,
    },
    background: {
      paddingTop: '56.25%',
      backgroundSize: 'cover',
    },
    elements: {
      position: 'absolute',
      top: 0,
      left: 0,
      width,
      height,
      transformOrigin: 'top left',
    },
    element: {
      position: 'absolute',
    },
  }),
  { name: 'Slide' },
);

export default function Slide({ slide, onClick, elevation, editing }: Props) {
  if (!slide) {
    return null;
  }

  const classes = useStyles();
  const { templateId, backgroundId, data } = slide;
  const background = backgrounds[backgroundId];
  const template = templates[templateId];

  return (
    <Paper
      elevation={elevation}
      className={classnames(classes.root, {
        [classes.editing]: editing,
      })}
      onClick={() => {
        onClick(slide);
      }}
      aria-hidden
      square
    >
      <Artboard template={template} background={background} data={data} />
    </Paper>
  );
}

Slide.defaultProps = {
  elevation: 5,
  editing: false,
  onClick: () => {},
};

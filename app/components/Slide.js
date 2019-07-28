// @flow
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import classnames from 'classnames';
import templates from 'assets/templates';
import backgrounds from 'assets/backgrounds';
import gradients from 'assets/gradients';
import { bindDataToTemplate, createSongTemplate } from 'utils/template';
import type { SlideState, RegularSlide } from 'redux/types';

import Artboard from 'components/Artboard';

type Props = {
  slide: SlideState,
  elevation?: number,
  editing?: boolean,
  onClick?: (slide: RegularSlide) => void,
};

const useStyles = makeStyles(
  theme => ({
    root: {
      position: 'relative',
      border: [['solid', 1, 'rgba(255, 255, 255, 0.6)']],
    },
    editing: {
      borderColor: theme.palette.misc.activeItem,
    },
  }),
  { name: 'Slide' },
);

export default function Slide({ slide, onClick, elevation, editing }: Props) {
  if (!slide) {
    return null;
  }

  const classes = useStyles();

  let template;
  let backgroundProp;

  if (slide.type === 'song') {
    backgroundProp = {
      backgroundGradient: gradients[slide.gradientId].backgroundImage,
    };
    template = createSongTemplate(slide.overrides);
  } else {
    const { templateId, backgroundId } = slide;
    backgroundProp = { backgroundImage: backgrounds[backgroundId] };
    template = templates[templateId];
    template = bindDataToTemplate(template, slide.data);
  }

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
      <Artboard template={template} {...backgroundProp} />
    </Paper>
  );
}

Slide.defaultProps = {
  elevation: 5,
  editing: false,
  onClick: () => {},
};

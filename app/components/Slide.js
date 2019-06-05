// @flow
import React, { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import get from 'lodash/get';
import classnames from 'classnames';
import { addListener, removeListener } from 'resize-detector';
import templates from 'templates/';
import backgrounds from 'images/backgrounds';
import type { SlideState, Slide as SlideType } from 'redux/types';

type Props = {
  slide: SlideState,
  elevation?: number,
  editing?: boolean,
  onClick?: (slide: SlideType) => void,
};

const width = 1920;
const height = 1080;

const useStyles = makeStyles(theme => ({
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
}));

export default function Slide({ slide, onClick, elevation, editing }: Props) {
  if (!slide) {
    return null;
  }

  const classes = useStyles();
  const wrapper = useRef();
  const [scale, setScale] = useState(1);
  const [display, setDisplay] = useState(false);
  const template = templates[slide.templateId];

  function updateScale() {
    if (!wrapper.current) {
      return;
    }

    setScale(wrapper.current.offsetWidth / width);
    setDisplay(true);
  }

  function getValue(name: string) {
    const placeholder = get(template.form, [name, 'placeholder'], '');

    return get(slide.data, name) || placeholder;
  }

  function renderText({
    key,
    fontSize = 20,
    fontWeight = 500,
    top = 'auto',
    right = 'auto',
    bottom = 'auto',
    left = 'auto',
  }: {
    key: string,
    fontSize: number,
    fontWeight: number,
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto',
  }) {
    const transform = 'translate(-50%, -50%)';
    const value = getValue(key);

    return (
      <div
        className={classes.element}
        key={key}
        style={{ fontSize, fontWeight, top, right, bottom, left, transform }}
      >
        {value}
      </div>
    );
  }

  function renderElements() {
    return (
      <div
        className={classes.elements}
        style={{
          transform: `scale(${scale})`,
          display: display ? 'block' : 'none',
        }}
      >
        {template.elements.map(element => {
          switch (element.type) {
            case 'text':
              return renderText(element);
            default:
              return null;
          }
        })}
      </div>
    );
  }

  useEffect(updateScale);

  useEffect(() => {
    addListener(wrapper.current, updateScale);

    return () => {
      removeListener(wrapper.current, updateScale);
    };
  }, []);

  const { backgroundId } = slide;
  const background = backgrounds[backgroundId];

  return (
    <Paper
      elevation={elevation}
      className={classnames(classes.root, {
        [classes.editing]: editing,
      })}
      ref={wrapper}
      onClick={() => {
        onClick(slide);
      }}
      aria-hidden
      square
    >
      <div
        className={classes.background}
        style={{ backgroundImage: `url(${background})` }}
      />
      {renderElements()}
    </Paper>
  );
}

Slide.defaultProps = {
  elevation: 5,
  editing: false,
  onClick: () => {},
};

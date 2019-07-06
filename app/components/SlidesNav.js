// @flow
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import classnames from 'classnames';
import { useTransition, animated } from 'react-spring';
import { easeQuadInOut as easing } from 'd3-ease';

import Slide from 'components/Slide';
import type { SlidesState, Slide as SlideType } from 'redux/types';

type Props = {
  slides: SlidesState,
  currentSlide: SlideType,
  disabled?: boolean,
  onSlideClicked: (slideId: string) => void,
};

const useStyles = makeStyles(
  {
    root: {
      position: 'relative',
      width: '100%',
      height: '100%',
    },
    disabled: {
      position: 'relative',
      opacity: 0.2,

      '&:after': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    inner: {
      maxHeight: '100%',
      overflowY: 'auto',
      padding: [[8, 24, 24, 0]],
    },
    item: {
      display: 'flex',
      alignItems: 'flex-end',
      // margin: [[16, 0]],
    },
    postion: {
      minWidth: 32,
      paddingRight: 8,
      textAlign: 'right',
      fontSize: '0.75em',
      color: 'rgba(255,255,255,0.7)',
    },
    slide: {
      flexGrow: 1,
      cursor: 'pointer',
    },
  },
  { name: 'SlidesNav' },
);

export default function SlidesNav({
  slides,
  currentSlide,
  disabled,
  onSlideClicked,
}: Props) {
  const classes = useStyles();

  const transitions = useTransition(slides, slide => slide.id, {
    config: {
      duration: 300,
      easing,
    },
    from: { height: 0, opacity: 0 },
    leave: () => async next => {
      await next({ opacity: 0 });
      await next({ height: 0 });
    },
    enter: () => async next => {
      await next({ height: 64 });
      await next({ opacity: 1 });
    },
  });

  return (
    <div
      className={classnames(classes.root, {
        [classes.disabled]: disabled,
      })}
    >
      <div className={classes.inner}>
        {transitions.map(({ item, props, key }, index) => (
          <animated.div className={classes.item} key={key} style={props}>
            <div className={classes.postion}>{index + 1}</div>
            <div className={classes.slide}>
              <Slide
                slide={item}
                elevation={3}
                editing={item.id === (currentSlide && currentSlide.id)}
                onClick={() => onSlideClicked(item.id)}
              />
            </div>
          </animated.div>
        ))}
      </div>
    </div>
  );
}

SlidesNav.defaultProps = {
  disabled: false,
};

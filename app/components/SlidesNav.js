// @flow
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import classnames from 'classnames';
import Slide from 'components/Slide';
import PlusButton from 'components/PlusButton';
import type { SlidesState, Slide as SlideType } from 'redux/types';

type Props = {
  slides: SlidesState,
  currentSlide: SlideType,
  disabled?: boolean,
  onSlideClicked: (slideId: string) => void,
  onAddClicked: (position: number) => void,
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
      padding: [[0, 24, 24, 0]],
    },
    item: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    postion: {
      width: 32,
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

export default function SlidesNav(props: Props) {
  const {
    slides,
    currentSlide,
    disabled,
    onSlideClicked,
    onAddClicked,
  } = props;

  const classes = useStyles();

  return (
    <div
      className={classnames(classes.root, {
        [classes.disabled]: disabled,
      })}
    >
      <div className={classes.inner}>
        <PlusButton
          onClick={() => {
            onAddClicked(0);
          }}
        />

        {slides.map((slide, index) => (
          <div key={slide.id}>
            <div className={classes.item}>
              <div className={classes.postion}>{index + 1}</div>
              <div className={classes.slide}>
                <Slide
                  slide={slide}
                  elevation={3}
                  editing={slide.id === (currentSlide && currentSlide.id)}
                  onClick={() => onSlideClicked(slide.id)}
                />
              </div>
            </div>
            <PlusButton onClick={() => onAddClicked(index + 1)} />
          </div>
        ))}
      </div>
    </div>
  );
}

SlidesNav.defaultProps = {
  disabled: false,
};

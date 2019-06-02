// @flow
import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classnames from 'classnames';
import backgrounds from 'images/backgrounds';
import type { SlidesState, Slide } from 'redux/types';
import PlusButton from './PlusButton';

type Props = {
  slides: SlidesState,
  currentSlide: Slide,
  disabled?: boolean,
  onSlideClicked: (slideId: string) => void,
  onAddClicked: (position: number) => void,
};

const useStyles = makeStyles(
  ({ palette }) => ({
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
    thumbnailWrapper: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    thumbnailPosition: {
      width: 32,
      paddingRight: 8,
      textAlign: 'right',
      fontSize: '0.75em',
      color: 'rgba(255,255,255,0.7)',
    },
    thumbnailImageWrapper: {
      flexGrow: 1,
      cursor: 'pointer',
    },
    thumbnailImage: {
      paddingBottom: '56.25%',
      border: [['solid', 1]],
      borderColor: 'rgba(255,255,255,0.7)',
      backgroundSize: 'cover',
    },
    thumbnailImageActive: {
      borderColor: palette.misc.activeItem,
    },
  }),
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
            <div className={classes.thumbnailWrapper}>
              <div className={classes.thumbnailPosition}>{index + 1}</div>
              <div className={classes.thumbnailImageWrapper}>
                <Paper
                  className={classnames(classes.thumbnailImage, {
                    [classes.thumbnailImageActive]:
                      slide.id === (currentSlide && currentSlide.id),
                  })}
                  elevation={3}
                  square
                  style={{
                    backgroundImage: `url(${backgrounds[slide.backgroundId]})`,
                  }}
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

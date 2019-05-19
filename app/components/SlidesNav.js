// @flow
import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classnames from 'classnames';
import backgrounds from 'images/backgrounds';
import type { SlidesState } from 'redux/types';
import PlusButton from './PlusButton';

type Props = {
  slides: SlidesState,
  currentSlideId: string,
  onSlideClicked: (slideId: string) => {},
  onAddClicked: (position: number) => {},
};

const useStyles = makeStyles(
  {
    root: {
      position: 'relative',
      width: '100%',
      height: '100%',

      '&:after': {
        content: '""',
        position: 'absolute',
        height: '70%',
        width: 1,
        right: 1,
        top: '15%',
        backgroundImage:
          'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)',
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
      borderColor: '#F9B74F',
    },
  },
  { name: 'SlidesNav' },
);

export default function SlidesNav(props: Props) {
  const { slides, currentSlideId, onSlideClicked, onAddClicked } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <PlusButton onClick={() => onAddClicked(0)} />

        {slides.map((slide, index) => {
          const background = backgrounds[slide.backgroundId];

          return (
            <div key={slide.id}>
              <div className={classes.thumbnailWrapper}>
                <div className={classes.thumbnailPosition}>{index + 1}</div>
                <div className={classes.thumbnailImageWrapper}>
                  <Paper
                    className={classnames(classes.thumbnailImage, {
                      [classes.thumbnailImageActive]:
                        slide.id === currentSlideId,
                    })}
                    elevation={3}
                    square
                    style={{
                      backgroundImage: `url(${background})`,
                    }}
                    onClick={() => onSlideClicked(slide.id)}
                  />
                </div>
              </div>
              <PlusButton onClick={() => onAddClicked(index + 1)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

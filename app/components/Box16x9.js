// @flow
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import type { Node } from 'react';
import image from 'images/169.svg';

type Props = {
  children: Node,
};

const useStyles = makeStyles(
  {
    root: {
      height: '100%',
      display: 'flex',
    },
    inner: {
      display: 'inline-block',
      position: 'relative',
      height: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      margin: 'auto',
    },
    image: {
      position: 'relative',
      height: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
      visibility: 'hidden',
      zIndex: -1,
    },
    content: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
  },
  { name: 'Box16x9' },
);

export default function Box16x9(props: Props) {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.content}>{children}</div>
        <img className={classes.image} src={image} alt="" />
      </div>
    </div>
  );
}

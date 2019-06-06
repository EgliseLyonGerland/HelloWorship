// @flow
import React from 'react';
import { makeStyles } from '@material-ui/styles';

type Props = {
  onClick: () => void,
};

const useStyles = makeStyles(
  theme => ({
    root: {
      marginLeft: 32,
      padding: [[8, 0]],
      cursor: 'pointer',

      '&:hover': {
        '& $inner': {
          background: theme.palette.secondary.dark,
          transition: 'height 0.2s 0.3s',

          '&:before': {
            paddingBottom: '56.25%',
            transition: 'padding 0.2s 0.3s',
          },
        },

        '& $plus': {
          visibility: 'visible',
          opacity: 1,
          transition: 'visibility 0s 0.5s, opacity 0.2s 0.5s',
        },
      },
    },
    inner: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'height 0.2s 0.1s',

      '&:before': {
        content: '""',
        paddingBottom: 4,
        transition: 'padding 0.2s 0.1s',
      },
    },
    plus: {
      display: 'inline-block',
      position: 'relative',
      margin: [['auto', 0]],
      visibility: 'hidden',
      opacity: 0,
      minWidth: 17,
      maxWidth: 17,
      height: 0,
      transition: 'opacity 0.2s, visibility 0s',

      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        transition: 'background-color 0.2s',
        background: theme.palette.secondary.light,
        top: '50%',
        left: '50%',
        marginTop: -8,
        marginLeft: -1,
        width: 2,
        height: 16,
      },

      '&:after': {
        transform: 'rotate(90deg)',
      },
    },
  }),
  { name: 'PlusButton' },
);

export default function PlusButton(props: Props) {
  const { onClick } = props;
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      onClick={onClick}
      onKeyPress={onClick}
      role="button"
      aria-hidden
    >
      <div className={classes.inner}>
        <div className={classes.plus} />
      </div>
    </div>
  );
}

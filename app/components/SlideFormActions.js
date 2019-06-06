// @flow
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Close';

import usePrevious from 'utils/usePrevious';

type Props = {
  hidden: boolean,
  onDone: () => void,
  onCancel: () => void,
};

const useStyles = makeStyles(
  theme => ({
    root: {
      position: 'absolute',
      bottom: 32,
      right: 32,
    },
    button: {
      color: theme.palette.secondary.dark,
    },
  }),
  { name: 'CurrentSlideActionz' },
);

export default ({ hidden, onDone, onCancel }: Props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const prevHidden = usePrevious(hidden);

  useEffect(() => {
    if (hidden !== prevHidden && hidden === true) {
      setOpen(false);
    }
  });

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="Current slide actions"
        color="secondary"
        direction="left"
        hidden={hidden}
        open={open && !hidden}
        icon={<SpeedDialIcon icon={<CheckIcon />} openIcon={<CheckIcon />} />}
        onBlur={() => setOpen(false)}
        onClose={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onClick={onDone}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <SpeedDialAction
          icon={<CancelIcon />}
          tooltipTitle="Cancel"
          tooltipPlacement="top"
          onClick={onCancel}
          classes={{ button: classes.button }}
        />
      </SpeedDial>
    </div>
  );
};

// @flow
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import usePrevious from 'utils/usePrevious';

type Props = {
  hidden: boolean,
  onEdit: () => void,
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

export default ({ hidden, onEdit }: Props) => {
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
        icon={<SpeedDialIcon icon={<EditIcon />} openIcon={<EditIcon />} />}
        onBlur={() => setOpen(false)}
        onClose={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onClick={onEdit}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <SpeedDialAction
          icon={<DeleteIcon />}
          tooltipTitle="Delete"
          tooltipPlacement="top"
          classes={{ button: classes.button }}
        />
      </SpeedDial>
    </div>
  );
};

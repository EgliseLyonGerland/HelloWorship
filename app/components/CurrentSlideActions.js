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
  onEdit: (close: () => void) => void,
  onDelete: (close: () => void) => void,
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

export default ({ hidden, onEdit, onDelete }: Props) => {
  const classes = useStyles();
  const [opened, setOpened] = useState(false);

  function open() {
    setOpened(true);
  }

  function close() {
    setOpened(false);
  }

  const prevHidden = usePrevious(hidden);
  useEffect(() => {
    if (hidden !== prevHidden && hidden === true) {
      close();
    }
  });

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="Current slide actions"
        color="secondary"
        direction="left"
        hidden={hidden}
        open={opened && !hidden}
        icon={<SpeedDialIcon icon={<EditIcon />} openIcon={<EditIcon />} />}
        onClick={() => onEdit(close)}
        onBlur={close}
        onClose={close}
        onFocus={open}
        onMouseEnter={open}
        onMouseLeave={close}
      >
        <SpeedDialAction
          icon={<DeleteIcon />}
          tooltipTitle="Delete"
          tooltipPlacement="top"
          onClick={() => onDelete(close)}
          classes={{ button: classes.button }}
        />
      </SpeedDial>
    </div>
  );
};

import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

type Props = {
  onAddClicked: () => void,
};

const useStyles = makeStyles(({ palette }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    background: palette.secondary.dark,
    height: 72,
    minHeight: 72,
    padding: [[20, 8, 0]],
    borderBottom: [[1, 'rgba(0, 0, 0, .2)', 'solid']],
    '-webkit-app-region': 'drag',
  },
}));

export default function TitleBar({ onAddClicked }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        size="small"
        color="secondary"
        onClick={onAddClicked}
      >
        <AddIcon />
      </Button>
    </div>
  );
}

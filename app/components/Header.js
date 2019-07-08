import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

type Props = {
  onAddRegularSlideClicked: () => void,
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

export default function Header({ onAddRegularSlideClicked }: Props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const buttonEl = useRef(null);

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        size="small"
        color="secondary"
        onClick={() => setOpen(!open)}
        ref={buttonEl}
      >
        <AddIcon />
        <ArrowDropDownIcon />
      </Button>
      <Popper open={open} anchorEl={buttonEl.current} transition>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper square>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      onAddRegularSlideClicked();
                      setOpen(false);
                    }}
                  >
                    Regular slide
                  </MenuItem>
                  <MenuItem>Song slide</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

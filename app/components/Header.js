import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import logo from 'images/logo.svg';

const useStyles = makeStyles(
  {
    img: { margin: [[0, 'auto']] },
  },
  { name: 'Header' },
);

export default () => {
  const classes = useStyles();

  return (
    <AppBar position="relative" color="inherit" elevation={0}>
      <Toolbar>
        <img className={classes.img} src={logo} alt="Logo" />
      </Toolbar>
    </AppBar>
  );
};

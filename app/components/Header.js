import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import logo from 'images/logo.svg';

const Image = styled('img')({
  margin: [[0, 'auto']],
});

export default () => (
  <AppBar position="relative" color="inherit" elevation={0}>
    <Toolbar>
      <Image src={logo} alt="Logo" />
    </Toolbar>
  </AppBar>
);

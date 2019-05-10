import React, { Component } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import logo from 'images/logo.svg';

const Image = styled('img')({
  margin: [[0, 'auto']],
});

export default class Header extends Component {
  render() {
    return (
      <AppBar position="relative" color="default" elevation={0}>
        <Toolbar>
          <Image src={logo} alt="Logo" />
        </Toolbar>
      </AppBar>
    );
  }
}

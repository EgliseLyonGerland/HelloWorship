// @flow
import React, { Component } from 'react';
import { styled } from '@material-ui/styles';
import Header from 'components/Header';

type Props = {};

const Wrapper = styled('div')({
  width: '100vw',
  height: '100vh',
});

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <Wrapper data-tid="container">
        <Header />
      </Wrapper>
    );
  }
}

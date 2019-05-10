// @flow
import React, { Component } from 'react';
import { styled } from '@material-ui/styles';
import Header from 'components/Header';
import SlidesNav from 'components/SlidesNav';

type Props = {};

const Wrapper = styled('div')({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const HeaderWrapper = styled('div')({});

const ContentWrapper = styled('div')({
  flexGrow: 1,
  display: 'flex',
  overflow: 'hidden',
});

const SlidesNavWrapper = styled('div')({
  width: 136,
});

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <Wrapper data-tid="container">
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <ContentWrapper>
          <SlidesNavWrapper>
            <SlidesNav />
          </SlidesNavWrapper>
        </ContentWrapper>
      </Wrapper>
    );
  }
}

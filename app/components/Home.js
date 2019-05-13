// @flow
import React, { Component } from 'react';
import { TextField, Paper, Button } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import Header from 'components/Header';
import Slide from 'components/Slide';
import SlidesNav from 'components/SlidesNav';
import type { SlidesState } from 'redux/types';

type Props = {
  slides: SlidesState,
};

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

const CurrentSlideWrapper = styled('div')(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '8vw',

  [theme.breakpoints.down('lg')]: {
    padding: '4vw',
  },
}));

const CurrentSlide = styled(Paper)({
  border: [['solid', 1, 'white']],
});

const CurrentSlideActions = styled('div')({
  marginTop: 32,
  display: 'flex',
  justifyContent: 'center',
});

const SettingsWrapper = styled('div')(({ theme: { palette } }) => ({
  width: 400,
  padding: 32,
  borderLeft: `solid 1px ${palette.primary.dark}`,
}));

export default class Home extends Component<Props> {
  props: Props;

  render() {
    const { slides } = this.props;

    return (
      <Wrapper data-tid="container">
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <ContentWrapper>
          <SlidesNavWrapper>
            <SlidesNav slides={slides} />
          </SlidesNavWrapper>
          <CurrentSlideWrapper>
            <CurrentSlide elevation={10} square>
              <Slide />
            </CurrentSlide>
            <CurrentSlideActions>
              <Button variant="outlined" size="small" color="inherit">
                Edit
              </Button>
            </CurrentSlideActions>
          </CurrentSlideWrapper>
          <SettingsWrapper>
            <TextField
              variant="filled"
              label="Foobar"
              margin="normal"
              fullWidth
            />
            <TextField
              variant="filled"
              label="Foobar"
              margin="normal"
              multiline
              fullWidth
            />
          </SettingsWrapper>
        </ContentWrapper>
      </Wrapper>
    );
  }
}

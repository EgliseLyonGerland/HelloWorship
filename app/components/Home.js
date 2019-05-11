// @flow
import React, { Component } from 'react';
import { TextField, Paper, Button } from '@material-ui/core';
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

const CurrentSlideWrapper = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: 32,
});

const CurrentSlide = styled(Paper)({
  paddingTop: '56.25%',
  backgroundSize: 'cover',
  backgroundImage: 'url(https://picsum.photos/id/13/500/300)',
  border: [['solid', 1, 'white']],
  borderRadius: 4,
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
    return (
      <Wrapper data-tid="container">
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <ContentWrapper>
          <SlidesNavWrapper>
            <SlidesNav />
          </SlidesNavWrapper>
          <CurrentSlideWrapper>
            <CurrentSlide elevation={10} />
            <CurrentSlideActions>
              <Button variant="outlined" size="small" color="white">
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

// @flow
import React from 'react';
import { Paper, Button } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import Header from 'components/Header';
import Slide from 'components/Slide';
import SlidesNav from 'components/SlidesNav';
import Box16x9 from 'components/Box16x9';
import SlideForm from 'components/SlideForm';
import type { SlidesState, CurrentSlideState } from 'redux/types';

type Props = {
  slides: SlidesState,
  currentSlide: CurrentSlideState,
  onSlideClicked: (slideId: string) => {},
  onAddClicked: (position: number) => {},
  onEditClicked: () => {},
  onDoneClicked: () => {},
  onCurrentSlideFieldChange: (name: string, value: mixed) => {},
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

const LeftPart = styled('div')({
  width: 136,
  minWidth: 136,
});

const MiddlePart = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: [[40, '4vw']],
});

const CurrentSlideWrapper = styled('div')({
  flexGrow: 1,
});

const CurrentSlide = styled(Paper)({
  border: [['solid', 1, 'rgba(255,255,255,0.7)']],
});

const CurrentSlideActions = styled('div')({
  paddingTop: 32,
  flexGrow: 0.1,
  margin: 'auto',
  minHeight: 56,
});

const RightPart = styled('div')(({ theme: { palette } }) => ({
  width: 400,
  minWidth: 400,
  padding: 32,
  borderLeft: `solid 1px ${palette.primary.dark}`,
}));

export default function(props: Props) {
  const {
    slides,
    currentSlide,
    onSlideClicked,
    onAddClicked,
    onEditClicked,
    onDoneClicked,
    onCurrentSlideFieldChange,
  } = props;

  if (!currentSlide) {
    return null;
  }

  return (
    <Wrapper data-tid="container">
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <ContentWrapper>
        <LeftPart>
          <SlidesNav
            slides={slides}
            currentSlide={currentSlide}
            onSlideClicked={onSlideClicked}
            onAddClicked={onAddClicked}
          />
        </LeftPart>
        <MiddlePart>
          <CurrentSlideActions />
          <CurrentSlideWrapper>
            <Box16x9>
              <CurrentSlide elevation={10} square>
                <Slide slide={currentSlide} />
              </CurrentSlide>
            </Box16x9>
          </CurrentSlideWrapper>
          <CurrentSlideActions>
            {!currentSlide.edit ? (
              <Button
                variant="outlined"
                size="small"
                color="inherit"
                onClick={onEditClicked}
              >
                Edit
              </Button>
            ) : (
              <Button
                variant="outlined"
                size="small"
                color="inherit"
                onClick={onDoneClicked}
              >
                Done
              </Button>
            )}
          </CurrentSlideActions>
        </MiddlePart>
        <RightPart>
          {currentSlide.edit && (
            <SlideForm
              slide={currentSlide}
              onFieldChange={onCurrentSlideFieldChange}
            />
          )}
        </RightPart>
      </ContentWrapper>
    </Wrapper>
  );
}

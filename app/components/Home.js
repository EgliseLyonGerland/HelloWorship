// @flow
import React from 'react';
import { Paper, Button } from '@material-ui/core';
import { darken } from '@material-ui/core/styles';
import { styled } from '@material-ui/styles';
import TitleBar from 'components/TitleBar';
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

const ContentWrapper = styled('div')({
  flexGrow: 1,
  display: 'flex',
  overflow: 'hidden',
});

const LeftPart = styled('div')(({ theme: { palette } }) => ({
  width: 136,
  minWidth: 136,
  borderRight: [['solid', 1, palette.primary.dark]],
}));

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

const CurrentSlide = styled(({ editing, ...rest }) => <Paper {...rest} />)(
  ({ editing, theme: { palette } }) => ({
    border: [
      [
        'solid',
        1,
        editing ? palette.misc.activeItem : 'rgba(255, 255, 255, 0.7)',
      ],
    ],
  }),
);

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
  background: darken(palette.primary.main, 0.1),
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
      <TitleBar />
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
              <CurrentSlide
                editing={currentSlide.edit}
                elevation={currentSlide.edit ? 16 : 8}
                square
              >
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

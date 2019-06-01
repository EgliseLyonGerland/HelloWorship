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
import TemplateAndBackgroundPicker from 'components/TemplateAndBackgroundPicker';
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

const leftPaneWidth = 136;
const rightPaneWidth = 400;

const Wrapper = styled('div')({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const Panes = styled('div')(({ extended }) => ({
  flexGrow: 1,
  display: 'flex',
  transition: 'transform 0.3s',
  transform: `translateX(-${extended ? leftPaneWidth : 0}px)`,
}));

const LeftPane = styled('div')(({ theme: { palette } }) => ({
  width: leftPaneWidth,
  minWidth: leftPaneWidth,
  borderRight: [['solid', 1, palette.primary.dark]],
}));

const MiddlePane = styled('div')({
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

const RightPane = styled('div')({
  minWidth: rightPaneWidth,
  maxWidth: rightPaneWidth,
});

const RightPaneInner = styled('div')(({ extended, theme: { palette } }) => ({
  padding: 32,
  width: extended ? rightPaneWidth + leftPaneWidth : rightPaneWidth,
  height: '100%',
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

  const extended = false;

  return (
    <Wrapper data-tid="container">
      <TitleBar />
      <Panes extended={extended}>
        <LeftPane>
          <SlidesNav
            slides={slides}
            currentSlide={currentSlide}
            onSlideClicked={onSlideClicked}
            onAddClicked={onAddClicked}
          />
        </LeftPane>
        <MiddlePane>
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
        </MiddlePane>
        <RightPane>
          <RightPaneInner extended={extended}>
            {currentSlide.edit &&
              (extended ? (
                <TemplateAndBackgroundPicker />
              ) : (
                <SlideForm
                  slide={currentSlide}
                  onFieldChange={onCurrentSlideFieldChange}
                />
              ))}
          </RightPaneInner>
        </RightPane>
      </Panes>
    </Wrapper>
  );
}

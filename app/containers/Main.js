// @flow
import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch, generatePath, matchPath } from 'react-router';
import { useTransition, animated, config } from 'react-spring';
import { darken } from '@material-ui/core/styles';
import { styled } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import type { Location, History } from 'react-router';

import TitleBar from 'components/TitleBar';
import Slide from 'components/Slide';
import SlidesNav from 'components/SlidesNav';
import Box16x9 from 'components/Box16x9';
import SlideForm from 'components/SlideForm';
import TemplateAndBackgroundPicker from 'components/TemplateAndBackgroundPicker';
import * as slidesActions from 'redux/actions/slides';
import * as currentSlideActions from 'redux/actions/currentSlide';
import {
  CURRENT_SLIDE,
  CURRENT_SLIDE_EDIT,
  CURRENT_SLIDE_SET_TEMPLATE_AND_BACKGROUND,
} from 'constants/routes';
import type { SlidesState, CurrentSlideState, Action } from 'redux/types';

type Props = {
  slides: SlidesState,
  currentSlide: CurrentSlideState,
  history: History,
  location: Location,
  addDefaultSlide: number => Action,
  saveCurrentSlide: () => Action,
  updateCurrentSlideField: (name: string, value: mixed) => Action,
};

const leftPaneWidth = 136;
const rightPaneWidth = 400;

const Wrapper = styled('div')({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const Panes = styled(({ extended, ...rest }) => <div {...rest} />)(
  ({ extended }) => ({
    flexGrow: 1,
    display: 'flex',
    transition: 'transform 0.3s',
    transform: `translateX(-${extended ? leftPaneWidth : 0}px)`,
  }),
);

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

const CurrentSlide = styled('div')({
  flexGrow: 1,
});

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

const RightPaneInner = styled(({ extended, ...rest }) => <div {...rest} />)(
  ({ extended, theme: { palette } }) => ({
    padding: 32,
    height: '100%',
    background: darken(palette.primary.main, 0.1),
    overflowY: 'auto',
    ...(extended
      ? {
          width: rightPaneWidth + leftPaneWidth,
        }
      : {
          transition: 'width 0s 0.3s',
          width: rightPaneWidth,
        }),
  }),
);

const mapStateToProps = state => ({
  slides: state.slides,
  currentSlide: state.currentSlide,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      ...slidesActions,
      ...currentSlideActions,
    },
    dispatch,
  );
};

function Main({
  slides,
  currentSlide,
  addDefaultSlide,
  saveCurrentSlide,
  updateCurrentSlideField,
  history,
  location,
}: Props) {
  useEffect(() => {
    if (slides.length === 0) {
      addDefaultSlide(0);
    }
  });

  useEffect(() => {
    if ((slides.length && location.pathname === '/') || !currentSlide) {
      history.push(generatePath(CURRENT_SLIDE, { slideId: slides[0].id }));
    }
  });

  const transitions = useTransition(location, loc => loc.pathname, {
    config: config.gentle,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { display: 'none' },
  });

  if (!currentSlide) {
    return null;
  }

  const editing = !!matchPath(location.pathname, {
    path: CURRENT_SLIDE_EDIT,
  });

  const extended = !!matchPath(location.pathname, {
    path: CURRENT_SLIDE_SET_TEMPLATE_AND_BACKGROUND,
  });

  return (
    <Wrapper data-tid="container">
      <TitleBar />
      <Panes extended={extended}>
        <LeftPane>
          <SlidesNav
            slides={slides}
            currentSlide={currentSlide}
            disabled={editing}
            onSlideClicked={slideId => {
              history.push(generatePath(CURRENT_SLIDE, { slideId }));
            }}
            onAddClicked={addDefaultSlide}
          />
        </LeftPane>
        <MiddlePane>
          <CurrentSlideActions />
          <CurrentSlide>
            <Box16x9>
              <Slide
                slide={currentSlide}
                editing={editing}
                elevation={editing ? 16 : 8}
              />
            </Box16x9>
          </CurrentSlide>
          <CurrentSlideActions>
            {!editing ? (
              <Button
                variant="outlined"
                size="small"
                color="inherit"
                onClick={() => {
                  history.push(
                    generatePath(CURRENT_SLIDE_EDIT, {
                      slideId: currentSlide.id,
                    }),
                  );
                }}
              >
                Edit
              </Button>
            ) : (
              <Button
                variant="outlined"
                size="small"
                color="inherit"
                onClick={saveCurrentSlide}
              >
                Done
              </Button>
            )}
          </CurrentSlideActions>
        </MiddlePane>
        <RightPane>
          <RightPaneInner extended={extended}>
            {transitions.map(({ props, key }) => (
              <animated.div style={props} key={key}>
                <Switch>
                  <Route
                    path={generatePath(CURRENT_SLIDE_EDIT, {
                      slideId: currentSlide.id,
                    })}
                    exact
                    render={() => (
                      <SlideForm
                        slide={currentSlide}
                        onFieldChange={updateCurrentSlideField}
                        onTemplateAndBackgroundChangeClicked={() => {
                          history.push(
                            generatePath(
                              CURRENT_SLIDE_SET_TEMPLATE_AND_BACKGROUND,
                              {
                                slideId: currentSlide.id,
                              },
                            ),
                          );
                        }}
                      />
                    )}
                  />
                  <Route
                    path={generatePath(
                      CURRENT_SLIDE_SET_TEMPLATE_AND_BACKGROUND,
                      {
                        slideId: currentSlide.id,
                      },
                    )}
                    exact
                    render={() => (
                      <TemplateAndBackgroundPicker
                        slide={currentSlide}
                        onClose={() => {
                          history.push(
                            generatePath(CURRENT_SLIDE_EDIT, {
                              slideId: currentSlide.id,
                            }),
                          );
                        }}
                      />
                    )}
                  />
                </Switch>
              </animated.div>
            ))}
          </RightPaneInner>
        </RightPane>
      </Panes>
    </Wrapper>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);

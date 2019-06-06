// @flow
import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch, generatePath, matchPath } from 'react-router';
import { animated, useSpring } from 'react-spring';
import { darken } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import classnames from 'classnames';
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
  updateCurrentSlideTemplate: (templateId: string) => Action,
  updateCurrentSlideBackground: (backgroundId: string) => Action,
  updateCurrentSlideField: (name: string, value: mixed) => Action,
};

const leftPaneWidth = 136;
const rightPaneWidth = 400;

const useStyles = makeStyles(
  ({ palette }) => ({
    wrapper: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    panes: {
      flexGrow: 1,
      display: 'flex',
    },
    leftPane: {
      width: leftPaneWidth,
      minWidth: leftPaneWidth,
      borderRight: [['solid', 1, palette.secondary.dark]],
    },
    middlePane: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: [[40, '4vw']],
    },
    currentSlide: {
      flexGrow: 1,
    },
    currentSlideActions: {
      paddingTop: 32,
      flexGrow: 0.1,
      margin: 'auto',
      minHeight: 56,
    },
    rightPane: {
      minWidth: rightPaneWidth,
      maxWidth: rightPaneWidth,
    },
    rightPaneInner: {
      padding: 32,
      height: '100%',
      background: darken(palette.secondary.main, 0.1),
      overflowY: 'auto',
      transition: 'width 0s 0.5s',
      width: rightPaneWidth,
    },
    rightPaneInnerExtended: {
      transition: 'width 0s',
      width: rightPaneWidth + leftPaneWidth,
    },
  }),
  { name: 'Main' },
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
  updateCurrentSlideTemplate,
  updateCurrentSlideBackground,
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

  const classes = useStyles();

  const editing = !!matchPath(location.pathname, {
    path: CURRENT_SLIDE_EDIT,
  });

  const extended = !!matchPath(location.pathname, {
    path: CURRENT_SLIDE_SET_TEMPLATE_AND_BACKGROUND,
  });

  const [displayRightPane, setDisplayRightPane] = useState(true);

  const panesStyles = useSpring({
    // immediate: !editing,
    to: { transform: `translateX(-${extended ? leftPaneWidth : 0}px)` },
    onRest() {
      setDisplayRightPane(true);
    },
  });

  const rightPaneStyles = useSpring({
    immediate: !displayRightPane,
    to: { opacity: displayRightPane ? 1 : 0 },
  });

  if (!currentSlide) {
    return null;
  }

  function goTo(route) {
    setDisplayRightPane(false);

    history.push(
      generatePath(route, {
        slideId: currentSlide.id,
      }),
    );
  }

  return (
    <div className={classes.wrapper}>
      <TitleBar />
      <animated.div className={classes.panes} style={panesStyles}>
        <div className={classes.leftPane}>
          <SlidesNav
            slides={slides}
            currentSlide={currentSlide}
            disabled={editing}
            onSlideClicked={slideId => {
              history.push(generatePath(CURRENT_SLIDE, { slideId }));
            }}
            onAddClicked={addDefaultSlide}
          />
        </div>
        <div className={classes.middlePane}>
          <div className={classes.currentSlideActions} />
          <div className={classes.currentSlide}>
            <Box16x9>
              <Slide
                slide={currentSlide}
                editing={editing}
                elevation={editing ? 16 : 8}
              />
            </Box16x9>
          </div>
          <div className={classes.currentSlideActions}>
            {!editing ? (
              <Button
                variant="outlined"
                size="small"
                color="inherit"
                onClick={() => {
                  goTo(CURRENT_SLIDE_EDIT);
                }}
              >
                Edit
              </Button>
            ) : (
              <Button
                variant="outlined"
                size="small"
                color="inherit"
                onClick={() => {
                  setDisplayRightPane(false);
                  saveCurrentSlide();
                }}
              >
                Done
              </Button>
            )}
          </div>
        </div>
        <div className={classes.rightPane}>
          <div
            className={classnames(classes.rightPaneInner, {
              [classes.rightPaneInnerExtended]: extended,
            })}
          >
            <animated.div style={rightPaneStyles}>
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
                        goTo(CURRENT_SLIDE_SET_TEMPLATE_AND_BACKGROUND);
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
                      slides={slides}
                      currentSlide={currentSlide}
                      onClose={() => {
                        goTo(CURRENT_SLIDE_EDIT);
                      }}
                      onTemplateSelected={updateCurrentSlideTemplate}
                      onBackgroundSelected={updateCurrentSlideBackground}
                    />
                  )}
                />
              </Switch>
            </animated.div>
          </div>
        </div>
      </animated.div>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);

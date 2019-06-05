// @flow
import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch, generatePath, matchPath } from 'react-router';
import { useTransition, animated, config } from 'react-spring';
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
    },
    panes: {
      flexGrow: 1,
      display: 'flex',
      transition: 'transform 0.3s',
    },
    panesExtended: {
      transform: `translateX(-${leftPaneWidth}px)`,
    },
    leftPane: {
      width: leftPaneWidth,
      minWidth: leftPaneWidth,
      borderRight: [['solid', 1, palette.primary.dark]],
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
      background: darken(palette.primary.main, 0.1),
      overflowY: 'auto',
      transition: 'width 0s 0.3s',
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
    <div className={classes.wrapper}>
      <TitleBar />
      <div
        className={classnames(classes.panes, {
          [classes.panesExtended]: extended,
        })}
      >
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
          </div>
        </div>
        <div className={classes.rightPane}>
          <div
            className={classnames(classes.rightPaneInner, {
              [classes.rightPaneInnerExtended]: extended,
            })}
          >
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);

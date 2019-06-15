// @flow
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import map from 'lodash/map';
import classnames from 'classnames';
import Slide from 'components/Slide';
import templates from 'templates/';
import backgrounds from 'images/backgrounds';
import type { SlidesState, Slide as SlideType } from 'redux/types';

type Props = {
  slides: SlidesState,
  currentSlide: SlideType,
  onClose: () => void,
  onTemplateSelected: (templateId: string) => void,
  onBackgroundSelected: (backgroundId: string) => void,
};

const useStyles = makeStyles(
  theme => ({
    root: {
      position: 'relative',
    },
    close: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    panes: {
      maxWidth: '100%',
      overflow: 'hidden',
      marginTop: 32,
    },
    panesInner: {
      display: 'flex',
      alignItems: 'flex-start',
      transition: 'transform .5s',
      margin: [[0, -16]],
    },
    pane: {
      display: 'grid',
      gridTemplateColumns: [['0.5fr', '0.5fr']],
      gridColumnGap: 24,
      gridRowGap: 24,
      minWidth: 'calc(100% - 32px)',
      maxWidth: 'calc(100% - 32px)',
      margin: [[0, 16]],
    },
    item: {
      cursor: 'pointer',
      position: 'relative',
    },
    slide: {},
    current: {
      opacity: 0.5,
    },
    itemTotalUsed: {
      position: 'absolute',
      bottom: 4,
      right: 4,
      background: theme.palette.secondary.dark,
      fontSize: 10,
      padding: [[2, 4]],
      borderRadius: 4,
    },
  }),
  { name: 'TemplateAndBackgroundPicker' },
);

export default ({
  slides,
  currentSlide,
  onClose,
  onTemplateSelected,
  onBackgroundSelected,
}: Props) => {
  const classes = useStyles();
  const [position, setPosition] = useState(0);

  function renderItem(type, id) {
    const keyName = `${type}Id`;

    let callback;
    if (type === 'background') {
      callback = onBackgroundSelected;
    } else {
      callback = onTemplateSelected;
    }

    const totalUsed = slides.reduce(
      (acc, curr) => acc + (curr[keyName] === id),
      0,
    );

    const current = slides.reduce(
      (acc, curr) =>
        acc || (curr.id === currentSlide.id && curr[keyName] === id),
      false,
    );

    return (
      <div
        key={id}
        className={classes.item}
        onClick={() => callback(id)}
        aria-hidden
      >
        <div
          className={classnames(classes.slide, {
            [classes.current]: current,
          })}
        >
          <Slide
            key={id}
            editing={id === currentSlide[keyName]}
            slide={{
              ...currentSlide,
              [keyName]: id,
            }}
          />
        </div>
        {totalUsed ? (
          <div className={classes.itemTotalUsed}>Used {totalUsed} times</div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Tabs value={position} indicatorColor="primary" textColor="inherit">
        <Tab label="Template" onClick={() => setPosition(0)} />
        <Tab label="Background" onClick={() => setPosition(1)} />
      </Tabs>
      <div className={classes.panes}>
        <div
          className={classes.panesInner}
          style={{ transform: `translateX(-${position * 100}%)` }}
        >
          <div className={classes.pane}>
            {map(templates, template => renderItem('template', template.id))}
          </div>
          <div className={classes.pane}>
            {map(backgrounds, (background, backgroundId) =>
              renderItem('background', backgroundId),
            )}
          </div>
        </div>
      </div>
      <IconButton
        className={classes.close}
        onClick={onClose}
        aria-label="Close"
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
};

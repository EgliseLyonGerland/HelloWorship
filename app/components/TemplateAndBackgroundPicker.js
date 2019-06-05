// @flow
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import map from 'lodash/map';
import Slide from 'components/Slide';
import templates from 'templates/';
import backgrounds from 'images/backgrounds';
import type { Slide as SlideType } from 'redux/types';

type Props = {
  slide: SlideType,
  onClose: () => void,
};

const useStyles = makeStyles(
  {
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
  },
  { name: 'TemplateAndBackgroundPicker' },
);

export default ({ slide, onClose }: Props) => {
  const classes = useStyles();
  const [position, setPosition] = React.useState(0);

  return (
    <div className={classes.root}>
      <Tabs value={position} indicatorColor="secondary" textColor="inherit">
        <Tab label="Template" onClick={() => setPosition(0)} />
        <Tab label="Background" onClick={() => setPosition(1)} />
      </Tabs>
      <div className={classes.panes}>
        <div
          className={classes.panesInner}
          style={{ transform: `translateX(-${position * 100}%)` }}
        >
          <div className={classes.pane}>
            {map(templates, template => (
              <Slide
                key={template.id}
                slide={{
                  ...slide,
                  templateId: template.id,
                }}
              />
            ))}
          </div>
          <div className={classes.pane}>
            {map(backgrounds, (background, backgroundId) => (
              <Paper className={classes.item} key={backgroundId} square>
                <Slide
                  slide={{
                    ...slide,
                    backgroundId,
                  }}
                />
              </Paper>
            ))}
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

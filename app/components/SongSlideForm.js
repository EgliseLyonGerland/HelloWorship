// @flow
import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import GradientPicker from 'components/GradientPicker';

type Props = {
  slide: RegularSlide,
  onGradientChange: (name: string, value: mixed) => void,
};

const useStyles = makeStyles(
  {
    root: {},
    gradientsWrapper: {
      marginBottom: 56,
    },
  },
  { name: 'SongSlideForm' },
);

const renderTitle = title => {
  return (
    <Fragment>
      <Typography variant="body2" color="textSecondary" component="div">
        {title}
      </Typography>
      <Divider style={{ margin: '16px 0 24px' }} />
    </Fragment>
  );
};

export default function SongSlideForm(props: Props) {
  const { slide, onGradientChange } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.gradientsWrapper}>
        {renderTitle('Background color')}
        <GradientPicker currentSlide={slide} onSelected={onGradientChange} />
      </div>
    </div>
  );
}

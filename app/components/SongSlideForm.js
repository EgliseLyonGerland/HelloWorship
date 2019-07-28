// @flow
import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import capitalize from 'lodash/capitalize';
import GradientPicker from 'components/GradientPicker';
import { stringifyLyrics, parseLyrics } from 'utils/song';

type Props = {
  slide: RegularSlide,
  onGradientChange: (name: string, value: mixed) => void,
  onFieldChange: (name: string, value: mixed) => void,
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
  const { slide, onGradientChange, onFieldChange } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.gradientsWrapper}>
        {renderTitle('Background color')}
        <GradientPicker currentSlide={slide} onSelected={onGradientChange} />
      </div>
      <div className={classes.gradientsWrapper}>
        {renderTitle('Song')}

        <div style={{ marginTop: -16 }}>
          {['title', 'authors', 'copyright'].map(field => (
            <TextField
              key={field}
              label={capitalize(field)}
              defaultValue={slide.overrides[field]}
              variant="filled"
              margin="normal"
              fullWidth
              onChange={event => {
                onFieldChange(field, event.target.value);
              }}
            />
          ))}

          <TextField
            label="Lyrics"
            defaultValue={stringifyLyrics(slide.overrides.lyrics)}
            variant="filled"
            margin="normal"
            fullWidth
            multiline
            onChange={event => {
              onFieldChange('lyrics', parseLyrics(event.target.value));
            }}
          />
        </div>
      </div>
    </div>
  );
}

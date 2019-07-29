// @flow
import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FilledInput from '@material-ui/core/FilledInput';
import capitalize from 'lodash/capitalize';
import map from 'lodash/map';
import GradientPicker from 'components/GradientPicker';
import { stringifyLyrics, parseLyrics } from 'utils/song';
import songs from 'assets/songs';

type Props = {
  slide: RegularSlide,
  onGradientChange: (id: string) => void,
  onSongChange: (id: string) => void,
  onFieldChange: (name: string, value: mixed) => void,
};

const useStyles = makeStyles(
  {
    root: {},
    part: {
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
  const { slide, onGradientChange, onSongChange, onFieldChange } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.part}>
        {renderTitle('Background color')}
        <GradientPicker currentSlide={slide} onSelected={onGradientChange} />
      </div>
      <div className={classes.part}>
        {renderTitle('Song')}

        <FormControl fullWidth variant="filled">
          <InputLabel>Song</InputLabel>
          <Select
            value={slide.songId}
            variant="filled"
            onChange={event => {
              onSongChange(event.target.value);
            }}
            input={<FilledInput />}
          >
            {map(songs, song => (
              <MenuItem key={song.id} value={song.id}>
                {song.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={classes.part}>
        {renderTitle('Overrides')}

        <div style={{ marginTop: -16 }}>
          {['title', 'authors', 'copyright'].map(field => (
            <TextField
              key={field}
              label={capitalize(field)}
              value={slide.overrides[field]}
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
            value={stringifyLyrics(slide.overrides.lyrics)}
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

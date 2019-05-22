// @flow
import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import get from 'lodash/get';
import transform from 'lodash/transform';
import templates from 'templates/';
import type { Slide } from 'redux/types';

type Props = {
  slide: Slide,
  onFieldChange: (name: string, value: mixed) => {},
};

const useStyles = makeStyles({
  root: {},
  templateAndBackgroundWrapper: {
    marginBottom: 56,
  },
  templateAndBackground: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  templateAndBackgroundPreviewWrapper: {
    flexGrow: 1,
    height: '100%',
    marginRight: 24,
  },
  templateParameters: {},
  templateParametersContent: {
    marginTop: -16,
  },
});

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

export default function SlideForm(props: Props) {
  const { slide, onFieldChange } = props;
  const { templateId } = slide;

  const classes = useStyles();
  const template = templates[templateId];

  return (
    <div className={classes.root}>
      <div className={classes.templateAndBackgroundWrapper}>
        {renderTitle('Template & background')}
        <div className={classes.templateAndBackground}>
          <div className={classes.templateAndBackgroundPreviewWrapper}>
            <Paper style={{ paddingBottom: '56.25%' }} square />
          </div>
          <Button variant="outlined" size="small">
            Change
          </Button>
        </div>
      </div>
      <div className={classes.templateParameters}>
        {renderTitle("Template's parameters")}

        <div className={classes.templateParametersContent}>
          {transform(
            template.form,
            (acc, curr, key) => {
              acc.push(
                <TextField
                  key={`${slide.id}${template.id}${key}`}
                  label={curr.label}
                  placeholder={curr.placeholder}
                  defaultValue={get(slide.data, key)}
                  variant="filled"
                  margin="normal"
                  multiline={!!curr.multiline}
                  fullWidth
                  onChange={event => {
                    onFieldChange(key, event.target.value);
                  }}
                />,
              );
            },
            [],
          )}
        </div>
      </div>
    </div>
  );
}

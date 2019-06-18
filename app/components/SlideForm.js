// @flow
import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import get from 'lodash/get';
import transform from 'lodash/transform';
import Slide from 'components/Slide';
import templates from 'assets/templates';
import type { Slide as SlideType } from 'redux/types';

type Props = {
  slide: SlideType,
  onFieldChange: (name: string, value: mixed) => void,
  onTemplateAndBackgroundChangeClicked: () => void,
};

const useStyles = makeStyles(
  {
    root: {},
    templateAndBackgroundWrapper: {
      marginBottom: 56,
    },
    templateAndBackground: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    templateAndBackgroundPreview: {
      flexGrow: 1,
      height: '100%',
      marginRight: 24,
    },
    templateParametersContent: {
      marginTop: -16,
    },
  },
  { name: 'SlideForm' },
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

export default function SlideForm(props: Props) {
  const { slide, onFieldChange, onTemplateAndBackgroundChangeClicked } = props;
  const { templateId, backgroundId } = slide;

  const classes = useStyles();
  const template = templates[templateId];

  return (
    <div className={classes.root}>
      <div className={classes.templateAndBackgroundWrapper}>
        {renderTitle('Template & background')}
        <div className={classes.templateAndBackground}>
          <div className={classes.templateAndBackgroundPreview}>
            <Slide slide={{ templateId, backgroundId }} />
          </div>
          <div>
            <Button
              variant="outlined"
              size="small"
              onClick={onTemplateAndBackgroundChangeClicked}
            >
              Change
            </Button>
          </div>
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

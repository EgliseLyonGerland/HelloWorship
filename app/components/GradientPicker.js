import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import map from 'lodash/map';
import classnames from 'classnames';
import gradients from 'assets/gradients';

type Props = {
  currentSlide: RegularSlide,
  onSelected: (templateId: string) => void,
};

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: [['1fr', '1fr', '1fr', '1fr', '1fr', '1fr']],
    gridColumnGap: '16px',
  },
  item: {
    paddingBottom: '100%',
    border: [['solid', 1, 'rgba(255, 255, 255, 0.5)']],
    borderRadius: 3,
    cursor: 'pointer',
  },
  current: {
    opacity: 0.5,
  },
});

export default ({ currentSlide, onSelected }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {map(gradients, ({ id, startColor }) => (
        <Paper
          key={id}
          className={classnames(classes.item, {
            [classes.current]: currentSlide.gradientId === id,
          })}
          style={{ backgroundColor: startColor }}
          onClick={() => onSelected(id)}
          elevation={3}
        />
      ))}
    </div>
  );
};

// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import get from 'lodash/get';
import classnames from 'classnames';
import templates from 'templates/';
import backgrounds from 'images/backgrounds';
import type { SlideState, Slide as SlideType } from 'redux/types';

type Props = {
  slide: SlideState,
  classes: Object,
  elevation?: number,
  editing?: boolean,
  onClick: (slide: SlideType) => void,
};

type State = {
  scale: number,
  display: boolean,
};

const width = 1920;
const height = 1080;

const styles = theme => ({
  root: {
    position: 'relative',
    border: [['solid', 1, 'rgba(255, 255, 255, 0.7)']],
  },
  editing: {
    borderColor: theme.palette.misc.activeItem,
  },
  background: {
    paddingTop: '56.25%',
    backgroundSize: 'cover',
  },
  elements: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    transformOrigin: 'top left',
  },
  element: {
    position: 'absolute',
  },
});

export default
@withStyles(styles)
class Slide extends Component<Props, State> {
  props: Props;

  state: State = {
    scale: 1,
    display: false,
  };

  componentDidMount() {
    this.updateScale();
  }

  componentWillReceiveProps() {
    this.updateScale();
  }

  wrapper: {
    current: null | HTMLDivElement,
  } = React.createRef();

  updateScale() {
    if (!this.wrapper.current) {
      return;
    }

    setTimeout(() => {
      this.setState({
        scale: this.wrapper.current.offsetWidth / width,
        display: true,
      });
    }, 0);
  }

  getTemplate() {
    const { slide } = this.props;
    const { templateId } = slide;

    return templates[templateId];
  }

  getValue(name: string) {
    const { slide } = this.props;
    const template = this.getTemplate();
    const placeholder = get(template.form, [name, 'placeholder'], '');

    return get(slide.data, name) || placeholder;
  }

  renderText({
    key,
    fontSize = 20,
    fontWeight = 500,
    top = 'auto',
    right = 'auto',
    bottom = 'auto',
    left = 'auto',
  }: {
    key: string,
    fontSize: number,
    fontWeight: number,
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto',
  }) {
    const { classes } = this.props;
    const transform = 'translate(-50%, -50%)';
    const value = this.getValue(key);

    return (
      <div
        className={classes.element}
        key={key}
        style={{ fontSize, fontWeight, top, right, bottom, left, transform }}
      >
        {value}
      </div>
    );
  }

  renderElements() {
    const { classes } = this.props;
    const { scale, display } = this.state;
    const template = this.getTemplate();

    return (
      <div
        className={classes.elements}
        style={{
          transform: `scale(${scale})`,
          display: display ? 'block' : 'none',
        }}
      >
        {template.elements.map(element => {
          switch (element.type) {
            case 'text':
              return this.renderText(element);
            default:
              return null;
          }
        })}
      </div>
    );
  }

  render() {
    const { slide, classes, onClick, elevation, editing } = this.props;

    if (!slide) {
      return null;
    }

    const { backgroundId } = slide;
    const background = backgrounds[backgroundId];

    return (
      <Paper
        elevation={elevation}
        className={classnames(classes.root, {
          [classes.editing]: editing,
        })}
        ref={this.wrapper}
        onClick={() => onClick(slide)}
        aria-hidden
        square
      >
        <div
          className={classes.background}
          style={{ backgroundImage: `url(${background})` }}
        />
        {this.renderElements()}
      </Paper>
    );
  }
}

Slide.defaultProps = {
  elevation: 5,
  editing: false,
};

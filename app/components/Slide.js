// @flow
import React, { Component } from 'react';
import { styled } from '@material-ui/styles';
import get from 'lodash/get';
import templates from 'templates/';
import backgrounds from 'images/backgrounds';
import type { SlideState } from 'redux/types';

type Props = {
  slide: SlideState,
};

type State = {
  scale: number,
  display: boolean,
};

const width = 1920;
const height = 1080;

const Wrapper = styled('div')({
  position: 'relative',
});

const Background = styled('div')(({ src }) => ({
  paddingTop: '56.25%',
  backgroundSize: 'cover',
  backgroundImage: `url(${src})`,
}));

const Elements = styled(({ scale, display, ...rest }) => <div {...rest} />)(
  ({ scale, display }) => ({
    display: display ? 'block' : 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
  }),
);

const Element = styled('div')({
  position: 'absolute',
});

export default class Slide extends Component<Props, State> {
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

    this.setState({
      scale: this.wrapper.current.offsetWidth / width,
      display: true,
    });
  }

  getValue(name: string) {
    const { slide } = this.props;

    return get(slide.data, name, '');
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
    const transform = 'translate(-50%, -50%)';
    const value = this.getValue(key);

    return (
      <Element
        key={key}
        style={{ fontSize, fontWeight, top, right, bottom, left, transform }}
      >
        {value}
      </Element>
    );
  }

  render() {
    const { scale, display } = this.state;
    const { slide } = this.props;

    if (!slide) {
      return null;
    }

    const { templateId, backgroundId } = slide;
    const template = templates[templateId];
    const background = backgrounds[backgroundId];

    return (
      <Wrapper ref={this.wrapper}>
        <Background src={background} />

        <Elements scale={scale} display={display}>
          {template.elements.map(element => {
            switch (element.type) {
              case 'text':
                return this.renderText(element);
              default:
                return null;
            }
          })}
        </Elements>
      </Wrapper>
    );
  }
}

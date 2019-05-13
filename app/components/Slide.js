import React, { Component } from 'react';
import { styled } from '@material-ui/styles';
import get from 'lodash/get';
import templates from 'templates/';

const width = 1920;
const height = 1080;

const slide = {
  templateId: 'e5c6a5d1-f196-4e59-bee2-dfed87257646',
  data: {
    title: 'Hello World!',
  },
};

const Wrapper = styled('div')({
  position: 'relative',
});

const Background = styled('div')({
  paddingTop: '56.25%',
  backgroundSize: 'cover',
  backgroundImage: 'url(https://picsum.photos/id/13/500/300)',
});

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

export default class Slide extends Component {
  static getValue(name) {
    return get(slide.data, name, '');
  }

  static renderText({
    key,
    fontSize = 20,
    fontWeight = 500,
    top = 'auto',
    right = 'auto',
    bottom = 'auto',
    left = 'auto',
  }) {
    const transform = 'translate(-50%, -50%)';
    const value = Slide.getValue(key);

    return (
      <Element
        key={key}
        style={{ fontSize, fontWeight, top, right, bottom, left, transform }}
      >
        {value}
      </Element>
    );
  }

  state = {
    scale: 1,
    display: false,
  };

  componentDidMount() {
    this.updateScale();
  }

  updateScale() {
    this.setState({
      scale: this.wrapper.offsetWidth / width,
      display: true,
    });
  }

  render() {
    const { scale, display } = this.state;
    const { templateId } = slide;

    const template = templates[templateId];

    return (
      <Wrapper
        ref={elt => {
          this.wrapper = elt;
        }}
      >
        <Background />

        <Elements scale={scale} display={display}>
          {template.elements.map(element => {
            switch (element.type) {
              case 'text':
                return Slide.renderText(element);
              default:
                return null;
            }
          })}
        </Elements>
      </Wrapper>
    );
  }
}

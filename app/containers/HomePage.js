// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from 'components/Home';
import * as SlidesActions from 'redux/actions/slides';
import type { SlidesState, Action } from 'redux/types';

type Props = {
  slides: SlidesState,
  addDefaultSlide: number => Action,
};

const mapStateToProps = state => ({
  slides: state.slides,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...SlidesActions,
    },
    dispatch,
  );
}

export default
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class HomePage extends Component<Props> {
  props: Props;

  componentDidMount() {
    this.avoirEmptySlides();
  }

  componentDidUpdate() {
    this.avoirEmptySlides();
  }

  avoirEmptySlides() {
    const { slides, addDefaultSlide } = this.props;

    if (slides.length === 0) {
      addDefaultSlide(0);
    }
  }

  render() {
    const { slides, addDefaultSlide } = this.props;

    return (
      <Home
        slides={slides}
        onAddSlideClicked={position => addDefaultSlide(position)}
      />
    );
  }
}

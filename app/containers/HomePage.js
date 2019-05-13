// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from 'components/Home';
import type { SlidesState } from 'redux/types';
import * as SlidesActions from 'redux/actions/slides';

type Props = {
  slides: SlidesState,
  addDefaultSlide: () => mixed,
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
      addDefaultSlide();
    }
  }

  render() {
    const { slides } = this.props;

    return <Home slides={slides} />;
  }
}

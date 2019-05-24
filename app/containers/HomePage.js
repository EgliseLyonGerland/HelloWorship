// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from 'components/Home';
import * as slidesActions from 'redux/actions/slides';
import * as currentSlideActions from 'redux/actions/currentSlide';
import type { SlidesState, CurrentSlideState, Action } from 'redux/types';

type Props = {
  slides: SlidesState,
  currentSlide: CurrentSlideState,
  addDefaultSlide: number => Action,
  setCurrentSlide: string => Action,
  editCurrentSlide: () => Action,
  saveCurrentSlide: () => Action,
  updateCurrentSlideField: (name: string, value: mixed) => Action,
};

const mapStateToProps = state => ({
  slides: state.slides,
  currentSlide: state.currentSlide,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...slidesActions,
      ...currentSlideActions,
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
    this.avoidEmptySlides();
    this.ensureSelectedSlide();
  }

  componentDidUpdate() {
    this.avoidEmptySlides();
  }

  avoidEmptySlides() {
    const { slides, addDefaultSlide } = this.props;

    if (slides.length === 0) {
      addDefaultSlide(0);
    }
  }

  ensureSelectedSlide() {
    const { slides, currentSlide, setCurrentSlide } = this.props;

    if (slides.length && currentSlide === null) {
      setCurrentSlide(slides[0].id);
    }
  }

  render() {
    const {
      slides,
      currentSlide,
      addDefaultSlide,
      setCurrentSlide,
      editCurrentSlide,
      saveCurrentSlide,
      updateCurrentSlideField,
    } = this.props;

    return (
      <Home
        slides={slides}
        currentSlide={currentSlide}
        onSlideClicked={setCurrentSlide}
        onAddClicked={addDefaultSlide}
        onEditClicked={editCurrentSlide}
        onDoneClicked={saveCurrentSlide}
        onCurrentSlideFieldChange={updateCurrentSlideField}
      />
    );
  }
}

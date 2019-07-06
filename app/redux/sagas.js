import { put, takeEvery, all, select } from 'redux-saga/effects';
import { generatePath } from 'react-router';
import { createMatchSelector, push } from 'connected-react-router';
import find from 'lodash/find';

import { replaceSlide, SLIDES_ADD, SLIDES_DELETE } from 'redux/actions/slides';
import {
  setCurrentSlide,
  CURRENT_SLIDE_SAVE,
} from 'redux/actions/currentSlide';
import { CURRENT_SLIDE } from 'constants/routes';

function* saveCurrentSlide() {
  const { currentSlide } = yield select();

  yield put(replaceSlide(currentSlide));
  yield put(push(generatePath(CURRENT_SLIDE, { slideId: currentSlide.id })));
}

function* addSlide({ slide }) {
  yield put(setCurrentSlide(slide.id));
}

function* deleteSlide({ position }) {
  const { slides } = yield select();
  const currentSlideIndex = Math.max(0, position - 1);
  const currentSlide = slides[currentSlideIndex];

  if (currentSlide) {
    yield put(setCurrentSlide(currentSlide.id));
  }
}

function* locationChange() {
  const state = yield select();

  const matchSelector = createMatchSelector({
    path: '/slides/:slideId',
    exact: true,
  });
  const match = matchSelector(state);

  if (match) {
    if (!find(state.slides, ['id', match.params.slideId])) {
      return;
    }

    yield put(setCurrentSlide(match.params.slideId));
  }
}

// Watchers

function* watchSaveCurrentSlide() {
  yield takeEvery(CURRENT_SLIDE_SAVE, saveCurrentSlide);
}

function* watchAddSlide() {
  yield takeEvery(SLIDES_ADD, addSlide);
}

function* watchDeleteSlide() {
  yield takeEvery(SLIDES_DELETE, deleteSlide);
}

function* watchLocationChange() {
  yield takeEvery('@@router/LOCATION_CHANGE', locationChange);
}

export default function* root() {
  yield all([
    watchAddSlide(),
    watchDeleteSlide(),
    watchSaveCurrentSlide(),
    watchLocationChange(),
  ]);
}

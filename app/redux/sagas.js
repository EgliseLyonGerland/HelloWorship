import { put, takeEvery, all, select } from 'redux-saga/effects';

import { replaceSlide, SLIDES_ADD } from 'redux/actions/slides';
import {
  setCurrentSlide,
  CURRENT_SLIDE_SAVE,
} from 'redux/actions/currentSlide';

function* saveCurrentSlide() {
  const {
    currentSlide: { edit, ...slide },
  } = yield select();

  yield put(replaceSlide(slide));
}

function* addSlide({ slide }) {
  yield put(setCurrentSlide(slide.id));
}

// Watchers

function* watchSaveCurrentSlide() {
  yield takeEvery(CURRENT_SLIDE_SAVE, saveCurrentSlide);
}

function* watchAddSlide() {
  yield takeEvery(SLIDES_ADD, addSlide);
}

export default function* root() {
  yield all([watchAddSlide(), watchSaveCurrentSlide()]);
}

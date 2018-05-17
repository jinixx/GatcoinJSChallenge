/**
 * @module Sagas/GitHub
 * @desc GitHub
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { simpleget } from 'modules/client';

import { ActionTypes } from 'constants/index';

/**
 * Login
 *
 * @param {Object} action
 *
 */
export function* getPopular() {
  try {
    const response = yield call(simpleget, 'https://gist.githubusercontent.com/jkongie/075ead69b9aaeb45581b995fbeef4ad6/raw/2688f82b789bddbab24875f4395a83aca5909d5a/feed.json');
    const { total, entries } = JSON.parse(response);
    yield put({
      type: ActionTypes.VIDEO_GET_POPULAR_SUCCESS,
      payload: { total, entries },
    });
  }
  catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.VIDEO_GET_POPULAR_FAILURE,
      payload: err,
    });
  }
}

/**
 * GitHub Sagas
 */
export default function* root() {
  yield all([
    takeLatest(ActionTypes.VIDEO_GET_POPULAR_REQUEST, getPopular),
  ]);
}

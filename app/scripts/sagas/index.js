import { all, fork } from 'redux-saga/effects';

import populartitles from './populartitles';
import user from './user';

/**
 * rootSaga
 */
export default function* root() {
  yield all([
    fork(populartitles),
    fork(user),
  ]);
}

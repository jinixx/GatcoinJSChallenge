// @flow
/**
 * @module Actions/User
 * @desc User Actions
 */
import { ActionTypes } from 'constants/index';

export function getPopularTitles(): Object {
  return {
    type: ActionTypes.VIDEO_GET_POPULAR_REQUEST,
    // payload: { query },
  };
}

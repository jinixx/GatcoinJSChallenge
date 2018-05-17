import immutable from 'immutability-helper';
import { createReducer } from 'modules/helpers';
import { parseError } from 'modules/client';

import { ActionTypes } from 'constants/index';

export const popularState = {
  entries: {
    data: [],
    status: 'idle',
    message: '',
    query: '',
    total: 0,
  },
};

export default {
  popularVideos: createReducer(popularState, {
    [ActionTypes.VIDEO_GET_POPULAR_REQUEST](state) {
      const data = state.entries.data ? state.entries.data : [];

      return immutable(state, {
        entries: {
          data: {
            $set: data,
          },
          message: { $set: '' },
          query: { $set: '' },
          status: { $set: 'running' },
        },
      });
    },
    [ActionTypes.VIDEO_GET_POPULAR_SUCCESS](state, { payload }) {
      return immutable(state, {
        entries: {
          data: {
            $set: payload.entries || [],
          },
          status: { $set: 'loaded' },
          total: { $set: payload.total },
        },
      });
    },
    [ActionTypes.VIDEO_GET_POPULAR_FAILURE](state, { payload }) {
      return immutable(state, {
        entries: {
          message: { $set: parseError(payload.message) },
          status: { $set: 'error' },
        },
      });
    },
  }),
};

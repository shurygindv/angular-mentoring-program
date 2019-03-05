import {initialState, authorAdapter} from './state';
import {ActionTypes, Actions} from './actions';

export const authorReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.START_FETCHING_AUTHORS:
    case ActionTypes.START_FETCHING_ONE_AUTHOR_BY_ID: {
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    }
    case ActionTypes.FINISH_FETCHING_AUTHORS_ERROR:
    case ActionTypes.FINISH_FETCHING_ONE_AUTHOR_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };
    }
    case ActionTypes.FINISH_FETCHING_AUTHORS_SUCCESS: {
      return authorAdapter.addAll(action.payload.items, {
        ...state,
        isFetching: false,
      });
    }
    case ActionTypes.FINISH_FETCHING_ONE_AUTHOR_SUCCESS: {
      return {
        ...state,
        current: action.payload.item,
        isFetching: false,
      };
    }

    default: {
      return state;
    }
  }
};

import {initialState} from './state';
import {ActionTypes, Actions} from './actions';

export const courseReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.START_FETCHING_COURSE: {
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    }
    case ActionTypes.FINISH_FETCHING_COURSES_SUCCESS: {
      return {
        ...state,
        items: action.payload.items,
        isFetching: false,
      };
    }
    case ActionTypes.FINISH_FETCHING_COURSES_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };
    }
    // ==== //
    case ActionTypes.START_FETCHING_COURSE: {
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    }
    case ActionTypes.FINISH_FETCHING_COURSES_SUCCESS: {
      return state;
    }
    case ActionTypes.FINISH_FETCHING_COURSES_ERROR: {
      return state;
    }
    // ==== //
    case ActionTypes.START_UPDATING_COURSE: {
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    }
    case ActionTypes.FINISH_UPDATING_COURSE_SUCCESS: {
      return state;
    }
    case ActionTypes.FINISH_UPDATING_COURSE_ERROR: {
      return state;
    }
    // ==== //
    case ActionTypes.START_DELETING_COURSE: {
      return {
        ...state,
        error: null,
        isFetching: true
      };
    }
    case ActionTypes.FINISH_DELETING_COURSE_SUCCESS: {
      return state;
    }
    case ActionTypes.FINISH_DELETING_COURSE_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      };
    }
    default: {
      return state;
    }
  }
};

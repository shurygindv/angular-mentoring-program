import {initialState, courseAdapter} from './state';
import {ActionTypes, Actions} from './actions';

export const courseReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.START_FETCHING_COURSES:
    case ActionTypes.START_FILTERING_COURSES:
    case ActionTypes.START_DELETING_COURSE:
    case ActionTypes.START_UPDATING_COURSE:
    case ActionTypes.START_FETCHING_COURSE:
    case ActionTypes.START_ADDING_COURSE: {
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    }
    case ActionTypes.FINISH_DELETING_COURSE_FAIL:
    case ActionTypes.FINISH_UPDATING_COURSE_FAIL:
    case ActionTypes.FINISH_FETCHING_COURSES_FAIL:
    case ActionTypes.FINISH_FILTERING_COURSES_FAIL:
    case ActionTypes.FINISH_ADDING_COURSE_FAIL: {
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };
    }
    case ActionTypes.FINISH_FETCHING_COURSES_SUCCESS:
    case ActionTypes.FINISH_FILTERING_COURSES_SUCCESS: {
      return courseAdapter.addAll(action.payload.items, {
        ...state,
        isFetching: false,
      });
    }
    case ActionTypes.FINISH_DELETING_COURSE_SUCCESS:
    case ActionTypes.FINISH_UPDATING_COURSE_SUCCESS:
    case ActionTypes.FINISH_ADDING_COURSE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
      };
    }

    default: {
      return state;
    }
  }
};

import {initialState} from './state';
import {ActionTypes, Actions} from './actions';

export const authReducer = (state = initialState, action: Actions) => {
  console.log(action);
  switch (action.type) {
    case ActionTypes.START_FETCH_USER_INFO:
    case ActionTypes.START_ATTEMPT_LOGIN: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ActionTypes.FINISH_FETCH_USER_INFO_ERROR:
    case ActionTypes.FINISH_ATTEMPT_LOGIN_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };
    }
    case ActionTypes.FINISH_ATTEMPT_LOGIN_SUCCESS: {
      return {
        ...state,
        userInfo: action.payload,
        isAuthenticated: true,
        isFetching: false,
      };
    }
    case ActionTypes.FINISH_FETCH_USER_INFO_SUCCESS: {
      return {
        ...state,
        userInfo: action.payload,
        isFetching: false,
      };
    }
    case ActionTypes.LOGOUT_SUCCES:
    case ActionTypes.LOGOUT: {
      return {...initialState};
    }
    default: {
      return state;
    }
  }
};

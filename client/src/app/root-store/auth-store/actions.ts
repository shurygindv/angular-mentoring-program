import {Action} from '@ngrx/store';

export enum ActionTypes {
  START_ATTEMPT_LOGIN = 'ATTEMPT_LOGIN',
  FINISH_ATTEMPT_LOGIN_SUCCESS = 'ATTEMPT_LOGIN--SUCCESS',
  FINISH_ATTEMPT_LOGIN_ERROR = 'ATTEMPT_LOGIN--ERROR',

  START_FETCH_USER_INFO = 'FETCH_USER_INFO',
  FINISH_FETCH_USER_INFO_SUCCESS = 'FETCH_USER_INFO--SUCCESS',
  FINISH_FETCH_USER_INFO_ERROR = 'FETCH_USER_INFO--ERROR',

  LOGOUT = 'LOGOUT',
}

interface ErrorMsg {
  error: string;
}

// attempt

interface AttemptPayload {
  email: string;
  password: string;
}

export class AttemptLoginAction implements Action {
  public readonly type: ActionTypes = ActionTypes.START_ATTEMPT_LOGIN;
  public readonly payload: AttemptPayload;

  constructor(payload: AttemptPayload) {
    this.payload = payload;
  }
}

export class AttemptLoginSuccessAction implements Action {
  public readonly type: ActionTypes = ActionTypes.FINISH_ATTEMPT_LOGIN_SUCCESS;
}

export class AttemptLoginErrorAction implements Action {
  public readonly type: ActionTypes = ActionTypes.FINISH_ATTEMPT_LOGIN_ERROR;

  public readonly payload: ErrorMsg;

  constructor(payload: ErrorMsg) {
    this.payload = payload;
  }
}

// user info

interface UserInfoPayload {
  id: string;
}

export class FetchUserInfoAction implements Action {
  public readonly type: ActionTypes = ActionTypes.START_FETCH_USER_INFO;
  public readonly payload: UserInfoPayload;

  constructor (payload: UserInfoPayload) {
    this.payload = payload;
  }
}

export class FetchUserInfoSuccessAction implements Action {
  public readonly type: ActionTypes =
    ActionTypes.FINISH_FETCH_USER_INFO_SUCCESS;
}

export class FetchUserInfoErrorAction implements Action {
  public readonly type: ActionTypes = ActionTypes.FINISH_FETCH_USER_INFO_ERROR;

  public readonly payload: ErrorMsg;

  constructor(payload: ErrorMsg) {
    this.payload = payload;
  }
}

export class LogoutAction implements Action {
  public readonly type: ActionTypes = ActionTypes.LOGOUT;
}

export type Actions =
  | AttemptLoginAction
  | AttemptLoginSuccessAction
  | AttemptLoginErrorAction
  | FetchUserInfoAction
  | FetchUserInfoSuccessAction
  | FetchUserInfoErrorAction
  | LogoutAction;

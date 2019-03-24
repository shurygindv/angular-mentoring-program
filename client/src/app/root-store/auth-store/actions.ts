import {Action} from '@ngrx/store';

import {UserInfo, UserFullInfo} from '../../core/services/auth/auth.interface';

export enum ActionTypes {
  START_ATTEMPT_LOGIN = 'ATTEMPT_LOGIN',
  FINISH_ATTEMPT_LOGIN_SUCCESS = 'ATTEMPT_LOGIN--SUCCESS',
  FINISH_ATTEMPT_LOGIN_ERROR = 'ATTEMPT_LOGIN--ERROR',

  START_FETCH_USER_INFO = '[UserInfo] Fetch',
  FINISH_FETCH_USER_INFO_SUCCESS = '[UserInfo::success] Fetch',
  FINISH_FETCH_USER_INFO_ERROR = '[UserInfo::error] Fetch',

  LOGOUT = 'LOGOUT',
  LOGOUT_SUCCES = 'LOGOUT_SUCCESS',
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
  public readonly type = ActionTypes.START_ATTEMPT_LOGIN;
  public readonly payload: AttemptPayload;

  constructor(payload: AttemptPayload) {
    this.payload = payload;
  }
}

export class AttemptLoginSuccessAction implements Action {
  public readonly type = ActionTypes.FINISH_ATTEMPT_LOGIN_SUCCESS;
  public readonly payload: UserInfo;

  constructor(payload: UserInfo) {
    this.payload = payload;
  }
}

export class AttemptLoginErrorAction implements Action {
  public readonly type = ActionTypes.FINISH_ATTEMPT_LOGIN_ERROR;
  public readonly payload: ErrorMsg;

  constructor(payload: ErrorMsg) {
    this.payload = payload;
  }
}

// user info

interface UserInfoPayload {
  id: string;
}

interface UserInfoDetailsPayload {
  firstName: string;
  lastName: string;
}

export class FetchUserInfoAction implements Action {
  public readonly type = ActionTypes.START_FETCH_USER_INFO;
  public readonly payload?: UserInfoPayload;

  constructor(payload?: UserInfoPayload) {
    this.payload = payload;
  }
}

export class FetchUserInfoSuccessAction implements Action {
  public readonly type = ActionTypes.FINISH_FETCH_USER_INFO_SUCCESS;
  public readonly payload: UserInfoDetailsPayload;

  constructor(payload: UserFullInfo) {
    this.payload = {
      firstName: payload.name.first,
      lastName: payload.name.last,
    };
  }
}

export class FetchUserInfoErrorAction implements Action {
  public readonly type = ActionTypes.FINISH_FETCH_USER_INFO_ERROR;
  public readonly payload: ErrorMsg;

  constructor(payload: ErrorMsg) {
    this.payload = payload;
  }
}

export class LogoutAction implements Action {
  public readonly type = ActionTypes.LOGOUT;
}

export class LogoutSuccessAction implements Action {
  public readonly type = ActionTypes.LOGOUT_SUCCES;
}

export type Actions =
  | AttemptLoginAction
  | AttemptLoginSuccessAction
  | AttemptLoginErrorAction
  | FetchUserInfoAction
  | FetchUserInfoSuccessAction
  | FetchUserInfoErrorAction
  | LogoutSuccessAction
  | LogoutAction;

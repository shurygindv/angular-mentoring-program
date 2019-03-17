export enum HTTP_CODE {
  Okay = 200,
  OkayAdded = 201,
  OkayDeleted = 204,

  BadRequest = 400,
  AuthorizationError = 401,
  NotFound = 404,
  InternalError = 500
}

export enum ErrorCode {
  unknownError = 0,
  validationError = 1,
  authorizationError = 2
}

export type MaybeNull<T> = T | null;

export interface ResponseResult<T = null> {
  Data: MaybeNull<T>;
  Success: boolean;
  ErrorDescription: MaybeNull<string>;
  ErrorCode: MaybeNull<number>;
}
  
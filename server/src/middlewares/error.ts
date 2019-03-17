import * as Koa from 'koa';

import { HttpResult } from '../helpers/http-result';
// import {ValidationError} from '../helpers/validation-error';
import { HTTP_CODE, ErrorCode } from '../types';
import { AuthorizationDeniedError } from '../helpers/authorization-denied';

const selectErrorInfo = <T extends Error>(e: T): [HTTP_CODE, ErrorCode] => {
  if (e instanceof AuthorizationDeniedError) {
    return [HTTP_CODE.AuthorizationError, ErrorCode.authorizationError];
  }

  //if (e instanceof ValidationError) {
  //  return [HTTP_CODE.BadRequest, ErrorCode.validationError];
  // }

  return [HTTP_CODE.InternalError, ErrorCode.unknownError];
};

export const errorMiddleware = () => async (ctx: Koa.Context, next: any) => {
  try {
    await next();
  } catch (e) {
    const [statusCode, errorCode] = selectErrorInfo(e);

    ctx.body = HttpResult.error(e.message, errorCode).valueOf();
    ctx.status = statusCode;
  }
};

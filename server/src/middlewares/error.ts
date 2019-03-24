import * as Koa from 'koa';

import { AuthorizationDeniedError } from '../helpers/authorization-denied';
import { HttpResult } from '../helpers/http-result';
import { HTTP_CODE, ErrorCode } from '../types';

const selectErrorInfo = <T extends Error>(e: T): [HTTP_CODE, ErrorCode] => {
  if (e instanceof AuthorizationDeniedError) {
    return [HTTP_CODE.AuthorizationError, ErrorCode.authorizationError];
  }

  return [HTTP_CODE.InternalError, ErrorCode.unknownError];
};

export const errorMiddleware = () => async (ctx: Koa.Context, next: any) => {
  try {
    await next();
  } catch (e) {
    const [statusCode, errorCode] = selectErrorInfo(e);

    ctx.body = HttpResult.error(e.message, errorCode);
    ctx.status = statusCode;
  }
};

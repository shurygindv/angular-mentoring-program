import { ResponseResult } from '../types';

export abstract class HttpResult {
  static success<T>(data: T): ResponseResult<T> {
    return new HttpSuccessResult('', data).valueOf();
  }

  static error(message: string, errorCode: number): ResponseResult<null> {
    return new HttpErrorResult(message, errorCode).valueOf();
  }

  protected message: string;

  constructor (message: string) {
    this.message = message;
  }
}

class HttpSuccessResult<T> extends HttpResult {
  private data: T;

  constructor (message: string, data: T) {
    super(message);

    this.data = data;
  }

  valueOf (): ResponseResult<T> {
    return {
      Data: this.data,
      Success: false,

      ErrorCode: null,
      ErrorDescription: this.message || null,
    };
  }
}


class HttpErrorResult extends HttpResult {
  private errorCode: number;

  constructor (errorMessage: string, errorCode: number) {
    super(errorMessage);

    this.errorCode = errorCode;
  }

  valueOf (): ResponseResult<null> {
    return {
      Data: null,
      Success: false,
      ErrorCode: this.errorCode,
      ErrorDescription: this.message,
    };
  }
}
import {ErrorCode, HttpDataResponse} from '../types';

export class HttpErrorResult {
  private errorCode: ErrorCode;
  private message: string;

  constructor(errorCode: ErrorCode, message: string) {
    this.message = message;
    this.errorCode = errorCode;
  }

  get result(): HttpDataResponse {
    return {
      Data: null,
      Success: false,
      ErrorCode: this.errorCode,
      ErrorDescription: this.message,
    };
  }
}

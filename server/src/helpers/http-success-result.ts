import { HttpDataResponse } from "../types";

export class HttpSuccessResult<T> {
  private data: T;

  constructor(data: T) {
    this.data = data;
  }

  get result(): HttpDataResponse<T> {
    return {
      Data: this.data,
      Success: true,
      ErrorCode: null,
      ErrorDescription: null
    };
  }
}

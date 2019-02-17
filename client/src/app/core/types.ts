export interface Response<T> {
  Data: T;
  Error: string;
  Success: boolean;
  ErrorDescription: string;
}

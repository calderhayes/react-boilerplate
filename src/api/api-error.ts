export enum APIErrorType {
  ERROR = 'ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  UNAUTHORIZED = 'UNAUTHORIZED'
}

export class APIError {

  public readonly isAPIError: boolean = true;

  private _apiErrorType: APIErrorType;
  private _message: string;
  private _data: any;

  public get apiErrorType() {
    return this._apiErrorType;
  }

  public get message() {
    return this._message;
  }

  public get data() {
    return this._data;
  }

  constructor(
    apiErrorType: APIErrorType,
    message = '',
    data: any = {}) {
    this._apiErrorType = apiErrorType;
    this._message = message;
    this._data = data;
  }

  public static unknownError() {
    return new APIError(
      APIErrorType.ERROR,
      'unknown_error');
  }
}

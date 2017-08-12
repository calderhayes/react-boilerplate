
import * as Model from 'api/models';

export enum APIServiceType {
  Mock,
  Live
}

export enum APIErrorType {
  ERROR = 'ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  UNAUTHORIZED = 'UNAUTHORIZED'
}

export enum HTTPStatusCode {
  OK = 200,
  INTERNAL_SERVER_ERROR = 500,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422
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

  public static handleResponseError(r: Response) {
    switch (r.status) {
      case HTTPStatusCode.UNAUTHORIZED:
      case HTTPStatusCode.NOT_FOUND:
      case HTTPStatusCode.FORBIDDEN:
      case HTTPStatusCode.BAD_REQUEST:
      case HTTPStatusCode.UNPROCESSABLE_ENTITY:
        return APIError.unknownError();
      default:
        return APIError.unknownError();
    }
  }
}

export interface IAPIService {
  type: APIServiceType;
  login(username: string, password: string): Promise<Model.IOAuth2Token>;
  getFeatures(): Promise<Array<Model.IFeature>>;
}

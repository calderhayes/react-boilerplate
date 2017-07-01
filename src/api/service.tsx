
import * as Model from './models';

export enum APIServiceType {
  LocalAPIService
}

export enum APIErrorType {
  ERROR,
  VALIDATION_ERROR,
  UNAUTHENTICATED,
  UNAUTHORIZED
}

export class APIError extends Error {

  public readonly isAPIError: boolean = true;

  private _apiErrorType: APIErrorType;
  private _message: string;
  private _data: any;

  get APIErrorType() {
    return this._apiErrorType;
  }

  get message() {
    return this._message;
  }

  get data() {
    return this._data;
  }

  constructor(
    apiErrorType: APIErrorType,
    message = '',
    data: any = {}) {
    super(message);
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

export interface IAPIService {
  type: APIServiceType;
  login(username: string, password: string): Promise<Model.IOAuth2TokenResult>;
  getFeatures(): Promise<Array<Model.IFeature>>;
}

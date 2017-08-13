
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




export interface IAPIService {
  type: APIServiceType;
  login(username: string, password: string): Promise<Model.IOAuth2Token>;
  getFeatures(): Promise<Array<Model.IFeature>>;
}

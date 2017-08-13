import * as Model from 'api/models';

export enum APIServiceType {
  Mock,
  Live
}

export interface ILoginService {
  login(username: string, password: string): Promise<Model.IOAuth2Token>;
}

export interface ISecurityService {
  getFeatures(): Promise<Array<Model.IFeature>>;
}

export interface IAPIService {
  readonly type: APIServiceType;
  readonly LoginService: ILoginService;
  readonly SecurityService: ISecurityService;
}

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

export interface IHelloService {
  sayHello(): void;
  registerSomeoneSaidHi(handler: (username: string) => void): void;
}

export interface IAPIService {
  readonly type: APIServiceType;
  readonly LoginService: ILoginService;
  readonly SecurityService: ISecurityService;
  readonly HelloService: IHelloService;
  startWebSocketConnection(token: string): Promise<void>;
  updateWebSocketAccessToken(token: string): void;
  stopWebSocketConnection(): Promise<void>;
}

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

export interface IWebSocketEventManager {
  registerErrorHandler(handler: (error: any) => any): void;
  registerConnectionSlowHandler(handler: () => void): void;
  registerReconnectingHandler(handler: () => void): void;
  registerReconnectedHandler(handler: () => void): void;
  registerDisconnectedHandler(handler: (lastError: any) => void): void;
}

export interface IAPIService {
  readonly type: APIServiceType;
  readonly LoginService: ILoginService;
  readonly SecurityService: ISecurityService;
  readonly HelloService: IHelloService;
  startWebSocketConnection(token: string): Promise<void>;
  updateWebSocketAccessToken(token: string): void;
  stopWebSocketConnection(): Promise<void>;
  readonly webSocketEventManager: IWebSocketEventManager;
}


import {IAPIService, APIServiceType} from 'api/interface';
import {IConfig} from 'interface';
import {IOC_TYPE} from 'ioc/ioc-type';
import {LoginService} from 'api/http/live/login-service';
import {SecurityService} from 'api/http/live/security-service';

import {SignalREventManager} from 'api/ws/live/signalr-event-manager';
import {HelloService} from 'api/ws/live/hello-service';

import {MockLoginService} from 'api/http/mock/login-service';
import {MockSecurityService} from 'api/http/mock/security-service';

import {MockWSEventManager} from 'api/ws/mock/mock-ws-event-manager';
import {MockHelloService} from 'api/ws/mock/hello-service';

import {SignalR} from 'api/ws/live/signalr';

import {ILoggerFactory} from 'articulog';
import {injectable, inject} from 'inversify';

export interface IAPIServiceFactory {
  create(): IAPIService;
}

@injectable()
export class APIServiceFactory {

  private config: IConfig;

  private loggerFactory: ILoggerFactory;

  constructor(
    @inject(IOC_TYPE.CONFIG) config: IConfig,
    @inject(IOC_TYPE.LOGGER_FACTORY) loggerFactory: ILoggerFactory) {
    this.config = config;
    this.loggerFactory = loggerFactory;
  }

  public create(): IAPIService {
    const logger = this.loggerFactory.createLog({
      name: 'API',
      loggerLevel: this.config.API_LOG_LEVEL
    });

    if (this.config.API_LIVE_ENABLED) {
      const apiService: IAPIService = {
        type: APIServiceType.Live,
        LoginService: new LoginService(logger, this.config.AUTH_URL),
        SecurityService: new SecurityService(logger, this.config.API_URL),
        HelloService: new HelloService(),
        startWebSocketConnection: (token: string) => {
          return SignalR.startConnection(logger, this.config.API_URL, token);
        },
        updateWebSocketAccessToken: (token: string) => {
          SignalR.updateAccessToken(token);
        },
        stopWebSocketConnection: () => {
          return SignalR.stopConnection();
        },
        webSocketEventManager: new SignalREventManager()
      };

      return apiService;
    }
    else {
      const apiService: IAPIService = {
        type: APIServiceType.Mock,
        LoginService: new MockLoginService(),
        SecurityService: new MockSecurityService(),
        HelloService: new MockHelloService(),
        startWebSocketConnection: (_: string) => {
          return Promise.resolve();
        },
        updateWebSocketAccessToken: (_: string) => {
          // do nothing
        },
        stopWebSocketConnection: () => {
          return Promise.resolve();
        },
        webSocketEventManager: new MockWSEventManager()
      };

      return apiService;
    }
  }

}

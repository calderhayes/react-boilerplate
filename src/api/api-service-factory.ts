
import {IAPIService, APIServiceType} from 'api/interface';
import {IConfig} from 'config';
import {IOC_TYPE} from 'ioc/ioc-type';
import {LoginService} from 'api/http/live/login-service';
import {SecurityService} from 'api/http/live/security-service';

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
        SecurityService: new SecurityService(logger, this.config.API_URL)
      };

      return apiService;
    }
    else {
      const apiService: IAPIService = {
        type: APIServiceType.Live,
        LoginService: null,
        SecurityService: null
      };

      return apiService;
    }
  }

}

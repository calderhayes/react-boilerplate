
import {APIService} from 'api/api-service';
import {LocalAPIService} from 'api/local-api-service';
import {IConfig, EnvironmentType} from 'config';
import * as Service from 'api/service';
import {IOC_TYPE} from 'ioc/ioc-type';

import {ILoggerFactory} from 'articulog';
import {injectable, inject} from 'inversify';

export interface IAPIServiceFactory {
  create(): Service.IAPIService;
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

  public create(): Service.IAPIService {
    const logger = this.loggerFactory.createLog({
      name: 'API',
      loggerLevel: this.config.API_LOG_LEVEL
    });

    if (this.config.ENVIRONMENT === EnvironmentType.LOCAL) {
      return new LocalAPIService(logger);
    }
    else if (this.config.ENVIRONMENT === EnvironmentType.LOCAL_DEV) {
      return new APIService(logger, this.config.API_URL, this.config.AUTH_URL);
    }
    else {
      throw 'Not yet implemented';
    }
  }

}

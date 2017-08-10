
import {APIService} from './api-service';
import {LocalAPIService} from './local-api-service';
import * as Models from './models';
import * as Service from './service';

// Move these to DI
import {EnvironmentType, IConfig} from '../config';
import {ApiLog} from '../logging';

export {Models};
export * from './service';


export class APIServiceFactory {

  public static create(config: IConfig): Service.IAPIService {
    if (config.ENVIRONMENT === EnvironmentType.LOCAL) {
      return new LocalAPIService(ApiLog);
    }
    else if (config.ENVIRONMENT === EnvironmentType.LOCAL_DEV) {
      return new APIService(ApiLog, config.API_URL, config.AUTH_URL);
    }
    else {
      throw 'Not yet implemented';
    }
  }

}


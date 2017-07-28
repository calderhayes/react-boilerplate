import {Config, EnvironmentType} from '../config';
import {ILogger} from '../logging';
import {LocalAPIService} from './local-api-service';
import {APIService} from './api-service';

export class APIServiceFactory {

  public static Create(apiLogger: ILogger) {
    if (Config.ENVIRONMENT === EnvironmentType.LOCAL) {
     return new LocalAPIService(apiLogger);
    }
    else if (Config.ENVIRONMENT === EnvironmentType.LOCAL_DEV) {
      return new APIService(apiLogger, Config.API_URL, Config.AUTH_URL);
    }
    else {
      throw 'Not yet implemented';
    }
  }
}

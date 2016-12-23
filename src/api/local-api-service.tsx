
import {IAPIService, APIServiceType, IAPIResult} from './service';
import {ILogger, NullLogger} from '../logging';
// import * as Model from './models';

export class LocalAPIService implements IAPIService {

  private logger: ILogger;

  constructor(logger?: ILogger) {
    this.logger = logger || NullLogger;
  }

  public get type() {
    return APIServiceType.LocalAPIService;
  }

  public login(username: string, password: string)
    : Promise<IAPIResult<string>> {

    return Promise.resolve({
      value: username + password
    });
  }

  public getFeatures() {
    return Promise.resolve({
      value: []
    });
  }

}

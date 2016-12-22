
import {IAPIService, APIServiceType, IAPIResult} from './service';
import {ILogger, NullLogger} from '../logging';
// import * as Model from './models';

export class LocalAPIService implements IAPIService {

  private logger: ILogger;

  constructor(logger?: ILogger) {
    this.logger = logger || NullLogger;
  }

  get type() {
    return APIServiceType.LocalAPIService;
  }

  login(username: string, password: string) {
    return Promise.resolve({
      value: ''
    });
  }

  getFeatures() {
    return Promise.resolve({
      value: []
    });
  }

}

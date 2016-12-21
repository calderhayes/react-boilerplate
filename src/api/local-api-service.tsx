
import {IAPIService, APIServiceType} from './service';
import {ILogger, NullLogger} from '../logging';

export class LocalAPIService implements IAPIService {

  private logger: ILogger;

  constructor(logger?: ILogger) {
    this.logger = logger || NullLogger;
  }

  get type() {
    return APIServiceType.LocalAPIService;
  }

  login(username: string, password: string) {
    return Promise.resolve('');
  }

}

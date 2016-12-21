
import {IAPIService, APIServiceType} from './service';

export class LocalAPIService implements IAPIService {

  get type() {
    return APIServiceType.LocalAPIService;
  }

  login(username: string, password: string) {
    return Promise.resolve('');
  }

}

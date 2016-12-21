
import {IAPIService} from './service';
import {Promise} from 'es6-promise';

export class LocalAPIService implements IAPIService {

  login(username: string, password: string) {
    return Promise.resolve('');
  }

}

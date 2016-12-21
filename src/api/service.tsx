
import {Config} from '../config';
import {LocalAPIService} from './local-api-service';

export enum APIServiceType {
  LocalAPIService
}

export interface IAPIService {

  type: APIServiceType;
  login(username: string, password: string): Promise<string>;

}

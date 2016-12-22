
import {Config} from '../config';
import {LocalAPIService} from './local-api-service';
import * as Model from './models';

export enum APIServiceType {
  LocalAPIService
}


export interface IAPIResult<T> {
  value: T;
  // other stuff
}

export interface IAPIService {

  type: APIServiceType;
  login(username: string, password: string): Promise<IAPIResult<string>>;
  getFeatures(): Promise<IAPIResult<Array<Model.IFeature>>>;

}

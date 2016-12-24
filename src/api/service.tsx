
import {Promise} from 'ts-promise';
import * as Model from './models';

export enum APIServiceType {
  LocalAPIService
}

export enum InputAPIResultStatus {
  SUCCESS,
  ERROR,
  VALIDATION_ERROR
}

export enum APIResultStatus {
  SUCCESS,
  ERROR
}

export interface IAPIResult<T> {
  value: T;
  status: APIResultStatus;
  // other stuff
}

export interface IInputAPIResult<T> extends IAPIResult<T> {
  inputStatus: InputAPIResultStatus;
}

export interface IAPIService {

  type: APIServiceType;
  login(username: string, password: string): Promise<IAPIResult<string>>;
  getFeatures(): Promise<IAPIResult<Array<Model.IFeature>>>;

}

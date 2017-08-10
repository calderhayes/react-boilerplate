import * as Model from '../../api/models';
import {BaseStore} from './base-store';

export interface IAppState {
  readonly exampleValue: number;
  readonly features: Array<Model.IFeature>;
  readonly authInfo: Model.IOAuth2TokenResult;
}

export interface IStore extends BaseStore<IAppState> {

}

export class Store extends BaseStore<IAppState> implements IStore {

}

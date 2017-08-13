import * as Model from 'api/models';
import {BaseStore} from './base-store';
import {injectable} from 'inversify';

export interface IAppState {
  readonly exampleValue: number;
  readonly features: Array<Model.IFeature>;
  readonly authInfo: Model.IOAuth2Token;
}

export const defaultState: IAppState = {
  exampleValue: 1,
  features: new Array<Model.IFeature>(),
  authInfo: null
};

export interface IStore extends BaseStore<IAppState> {

}

@injectable()
export class Store extends BaseStore<IAppState> implements IStore {

}

import {IAppState} from 'data';
import {BaseStore} from './base-store';
import {injectable} from 'inversify';

export interface IStore extends BaseStore<IAppState> {

}

@injectable()
export class Store extends BaseStore<IAppState> implements IStore {

}

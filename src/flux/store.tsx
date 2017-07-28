
import * as Immutable from 'immutable';
import {Models} from '../api';
import {BaseStore} from './base-store';

export interface IImmutableAppState {
  readonly exampleValue: number;
  readonly features: Array<Models.IFeature>;
  readonly authInfo: Models.IOAuth2TokenResult;
}

export interface IAppState extends IImmutableAppState {
  exampleValue: number;
  features: Array<Models.IFeature>;
  authInfo: Models.IOAuth2TokenResult;
}

export interface IStore extends BaseStore {

  getState(): IImmutableAppState;
  getMutableState(): IAppState;
  updateState(state: IAppState): void;

}


// Do not add accessors / helpers for the state data. Add them to BaseStore
export class Store extends BaseStore
  implements IStore {

  // Do not use this directly
  // Always use getState()
  private state: IAppState;

  public static get defaultAppState() {
    const defaultState: IAppState = {
      exampleValue: 1,
      features: new Array<Models.IFeature>(),
      authInfo: null
    };

    return defaultState;
  }

  constructor(initialState?: IAppState) {
    super();

    this.updateState(initialState || Store.defaultAppState);

  }

  public getState(): IImmutableAppState {
    const record = new (Immutable.Record(this.state) as any)() as IImmutableAppState;
    return record;
  }

  // Be careful when using this, only have use it
  // when passing into the reducer
  public getMutableState(): IAppState {
    return this.state;
  }

  public updateState(newState: IAppState): void {
    this.state = newState;
  }

}

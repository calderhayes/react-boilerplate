
import * as events from 'events';
import {reducer} from '../flux/reducer';
import * as _ from 'lodash';
import * as Immutable from 'immutable';
import * as Model from '../api/models';
import {BaseStore} from './base-store';

export interface IImmutableAppState {
  readonly exampleValue: number;
  readonly features: Array<Model.IFeature>;
}

export interface IAppState extends IImmutableAppState {
  exampleValue: number;
  features: Array<Model.IFeature>;
}

export interface IStore {

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

  constructor(initialState?: IAppState) {
    super();

    const defaultState: IAppState = {
      exampleValue: 1,
      features: new Array<Model.IFeature>()
    };

    this.updateState(initialState || defaultState);

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

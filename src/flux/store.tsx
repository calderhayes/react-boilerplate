
import * as events from 'events';
import {reducer} from '../flux/reducer';
import * as _ from 'lodash';
import * as Immutable from 'immutable';
import * as Model from '../api/models';


export interface IImmutableAppState {
  readonly exampleValue: number;
  readonly features: Model.IFeature[];
}

export interface IAppState extends IImmutableAppState {
  exampleValue: number;
  features: Model.IFeature[];
}

export interface IStore {

  getState(): IImmutableAppState;
  getMutableState(): IAppState;
  updateState(state: IAppState): void;

}

export class Store
  implements IStore {


  private state: IAppState;

  constructor(initialState?: IAppState) {

    let defaultState: IAppState = {
      exampleValue: 1,
      features: []
    };

    this.updateState(initialState || defaultState);

  }

  public getState(): IImmutableAppState {
    let record = new (Immutable.Record(this.state) as any) as IImmutableAppState;
    return record;
  }

  public getMutableState(): IAppState {
    return this.state;
  }

  public updateState(newState: IAppState): void {
    this.state = newState;
  }

}

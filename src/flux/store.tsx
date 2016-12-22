
import * as events from 'events';
import {reducer} from '../flux/reducer';
import * as _ from 'lodash';
import * as Immutable from 'immutable';

export interface IImmutableAppState {
  readonly exampleValue: number;
}

export interface IAppState extends IImmutableAppState {
  exampleValue: number;
}

export interface IStore {

  getState(): IImmutableAppState;
  getMutableState(): IAppState;
  updateState(state: IAppState): void;

}

export class Store
  implements IStore {


  private state: IAppState;

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

  constructor(initialState?: IAppState) {

    let defaultState: IAppState = {
      exampleValue: 1
    };

    this.updateState(initialState || defaultState);

  }

}

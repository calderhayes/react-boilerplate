
import * as events from 'events';
import {reducer} from '../flux/reducer';
import * as _ from 'lodash';
import * as Immutable from 'immutable';

export interface IAppState {
  exampleValue: number;
}

export interface IStore {

  getState(): IAppState;
  updateState(state: IAppState): void;

}

export class Store
  implements IStore {


  private state: IAppState;

  public getState(): IAppState {
    return Immutable.Record(this.state) as any;
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

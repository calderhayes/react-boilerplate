
import * as events from 'events';
import {reducer} from '../flux/reducer';
import * as _ from 'lodash';


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
    // TODO: Immutable
    return this.state;
  }

  public updateState(newState: IAppState): void {
    // TODO: Immutable
    this.state = newState;
  }

  constructor(initialState?: IAppState) {
    if (initialState) {
      this.state = initialState;
    }
    else {
      this.state = {
        exampleValue: 1
      };
    }
  }

}

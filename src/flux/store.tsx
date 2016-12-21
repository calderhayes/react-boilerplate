
import * as events from 'events';
import {AppDispatcher} from '../flux/dispatcher';
import {reducer} from '../flux/reducer';
import * as _ from 'lodash';


export interface IAppState {
  exampleValue: number;
}

export class AppStore {


  private state: IAppState;
  public getState(): IAppState {
    // TODO: Immutable
    return this.state;
  }

  public updateState(newState: IAppState): void {
    // TODO: Immutable
    this.state = newState;
  }

  constructor() {
    this.state = {
      exampleValue: 1
    };
  }

}


let Store = new AppStore();

export {Store};

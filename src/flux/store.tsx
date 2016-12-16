
import * as events from 'events';
import {AppDispatcher} from '../flux/dispatcher';
import {reducer} from '../flux/reducer';
import * as _ from 'lodash';

export class AppStore {

  public exampleValue: number = null;

  constructor() {
    this.exampleValue = null;
  }

}

export class AppEventEmitter extends events.EventEmitter {

  constructor() {
      super();
  }

  off(action: string, func: Function) {
      return this.removeListener(action, func);
  }

}

const AppEmitter = new AppEventEmitter();

let Store = new AppStore();

AppDispatcher.register((actionType: string, payload: any) => {

  // TODO: reducer(Immutable(Store), payoad);
  let retVal = reducer(Store, actionType, payload);

  Store = retVal.state;

  _.each(retVal.eventData, ev => {
    AppEmitter.emit(ev.type, ev.parameters);
  });

});

export {Store, AppEmitter};

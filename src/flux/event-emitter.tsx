import * as events from 'events';

export interface IEventEmitter extends events.EventEmitter {
  off(action: string, func: Function): this;
}

export class EventEmitter
  extends events.EventEmitter
  implements IEventEmitter {

  constructor() {
      super();
  }

  off(action: string, func: Function) {
      return this.removeListener(action, func);
  }

}

const AppEmitter = new EventEmitter();

export {AppEmitter};

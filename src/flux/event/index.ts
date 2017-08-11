import * as events from 'events';

// TODO: Move off of index
// TODO: Change this to an explicit type based system, or enum

export interface IEventEmitter extends events.EventEmitter {
  off(action: string, func: Function): this;
}

export class EventEmitter
  extends events.EventEmitter
  implements IEventEmitter {

  constructor() {
      super();
  }

  public off(action: string, func: Function) {
      return this.removeListener(action, func);
  }

}

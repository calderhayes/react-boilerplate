import * as events from 'events';

export class AppEventEmitter extends events.EventEmitter {

  constructor() {
      super();
  }

  off(action: string, func: Function) {
      return this.removeListener(action, func);
  }

}

const AppEmitter = new AppEventEmitter();

export {AppEmitter};

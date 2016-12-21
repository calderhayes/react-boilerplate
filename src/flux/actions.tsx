
import {IDispatcher} from './dispatcher';

export class ActionControl {

  public static get CONSTANTS() {
    return {
      EXAMPLE: 'EXAMPLE'
    };
  }

  public get CONSTANTS() {
    return ActionControl.CONSTANTS;
  }

  private dispatcher: IDispatcher;
  private api: any; // TODO: API layer here

  constructor(dispatcher: IDispatcher/*also put in the API*/) {
    this.dispatcher = dispatcher;
  }

  doExample() {

    this.dispatcher.dispatch(this.CONSTANTS.EXAMPLE, {
      value: (new Date()).getTime()
    });

    return Promise.resolve();

  }

}


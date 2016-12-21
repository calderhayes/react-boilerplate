
import {IDispatcher} from './dispatcher';
import {IAPIService} from '../api/service';

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
  private api: IAPIService;

  constructor(dispatcher: IDispatcher, service: IAPIService) {
    this.dispatcher = dispatcher;
    this.api = service;
  }

  doExample() {

    this.dispatcher.dispatch(this.CONSTANTS.EXAMPLE, {
      value: (new Date()).getTime()
    });

    return Promise.resolve();

  }

}


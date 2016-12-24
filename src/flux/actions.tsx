
import {Promise} from 'ts-promise';
import {IDispatcher} from './dispatcher';
import {IAPIService} from '../api/service';
import {ActionLog} from '../logging';

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

  public doExample() {
    ActionLog.info('Doing example...');

    this.dispatcher.dispatch(this.CONSTANTS.EXAMPLE, {
      value: (new Date()).getTime()
    });

    return Promise.resolve();

  }

  public login(username: string, password: string) {
    return new Promise((resolve) => {
      const tempTimeout = 2000;
      setTimeout(() => resolve(username + password), tempTimeout);
    });
  }

}


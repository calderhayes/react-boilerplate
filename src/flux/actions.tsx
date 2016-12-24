
import {Promise} from 'ts-promise';
import {IDispatcher} from './dispatcher';
import {IAPIService} from '../api/service';
import {ActionLog, ILogger} from '../logging';

export class ActionControl {

  public static get CONSTANTS() {
    return {
      EXAMPLE: 'EXAMPLE',
      LOGIN: 'LOGIN'
    };
  }

  public get CONSTANTS() {
    return ActionControl.CONSTANTS;
  }

  private readonly dispatcher: IDispatcher;
  private readonly api: IAPIService;
  private readonly log: ILogger;

  constructor(dispatcher: IDispatcher, service: IAPIService) {
    this.dispatcher = dispatcher;
    this.api = service;
    this.log = ActionLog;
  }

  public doExample() {
    this.log.info('Doing example...');

    this.dispatcher.dispatch(this.CONSTANTS.EXAMPLE, {
      value: (new Date()).getTime()
    });

    return Promise.resolve();

  }

  public login(username: string, password: string): Promise<void> {
    this.log.info('Logging in ', username);

    return this.api.login(username, password)
      .then((result) => {

        this.dispatcher.dispatch(this.CONSTANTS.LOGIN, result);
      });
  }

}


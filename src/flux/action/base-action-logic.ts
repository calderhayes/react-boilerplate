import {IDispatcher} from '../dispatcher';
import {IAPIService} from '../../api';
import {IEventEmitter} from '../event';
import {IStore} from '../store';


import {ILogger} from 'articulog';

// TODO: put into DI
import {ActionLog} from '../../logging';

export abstract class BaseActionLogic {

  protected readonly dispatcher: IDispatcher;

  protected readonly api: IAPIService;

  protected readonly eventEmitter: IEventEmitter;

  protected readonly store: IStore;

  protected readonly log: ILogger;

  constructor(dispatcher: IDispatcher, api: IAPIService, eventEmitter: IEventEmitter, store: IStore) {
    this.dispatcher = dispatcher;
    this.api = api;
    this.eventEmitter = eventEmitter;
    this.store = store;

    this.log = ActionLog;
  }

  protected unknownErrorHandler(error?: any) {
    this.log.error('An unknown error occured', error);
    this.eventEmitter.emit('temp3!!error!', {
      error
    });
  }

}

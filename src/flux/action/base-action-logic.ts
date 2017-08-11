import {IOC_TYPES} from '../../ioc-container';
import {IDispatcher} from '../dispatcher';
import {IAPIService} from '../../api';
import {IEventEmitter} from '../event';
import {IStore} from '../store';


import {ILogger} from 'articulog';
import {inject} from 'inversify';

// TODO: put into DI
import {ActionLog} from '../../logging';

export abstract class BaseActionLogic {

  protected readonly dispatcher: IDispatcher;

  @inject(IOC_TYPES.API_SERVICE)
  protected readonly api: IAPIService;

  @inject(IOC_TYPES.EVENT_EMITTER)
  protected readonly eventEmitter: IEventEmitter;

  @inject(IOC_TYPES.STORE)
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

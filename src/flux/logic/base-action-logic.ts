import {IDispatcher} from 'flux/dispatcher';
import {IAPIService} from 'api';
import {IEventEmitter, EventTypeKey} from 'flux/event';
import {IStore} from 'flux/store';
import {IConfig} from 'interface';

import {injectable} from 'inversify';
import {ILogger, ILoggerFactory} from 'articulog';

@injectable()
export abstract class BaseActionLogic {

  protected readonly dispatcher: IDispatcher;

  protected readonly api: IAPIService;

  protected readonly eventEmitter: IEventEmitter;

  protected readonly store: IStore;

  protected get logger() {
    if (this._logger) {
      return this._logger;
    }

    const className = (this as any).constructor.name;
    this._logger = this.loggerFactory.createLog({
      name: 'Action|' + className,
      loggerLevel: this.config.ACTION_LOG_LEVEL
    });

    return this._logger;
  };

  private config: IConfig;

  private _logger: ILogger;

  private loggerFactory: ILoggerFactory;

  constructor(
    dispatcher: IDispatcher,
    api: IAPIService,
    eventEmitter: IEventEmitter,
    store: IStore,
    loggerFactory: ILoggerFactory,
    config: IConfig) {

    this.dispatcher = dispatcher;
    this.api = api;
    this.eventEmitter = eventEmitter;
    this.store = store;
    this.config = config;

    this.loggerFactory = loggerFactory;
  }

  protected unknownErrorHandler(error?: any) {
    this.logger.error('An unknown error occured', error);
    this.eventEmitter.emit({
      type: EventTypeKey.UNKNOWN_ERROR,
      error
    });
  }

}

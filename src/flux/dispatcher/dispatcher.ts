import {ActionType} from 'flux/action';
import {Reducer} from 'flux/reducer/index';
import {IStore} from 'flux/store/index';
import {inject, injectable} from 'inversify';
import {IOC_TYPE} from 'ioc/ioc-type';
import {ILoggerFactory, ILogger} from 'articulog';
import {IConfig} from 'config';

export interface IDispatcher {
  dispatch(action: ActionType): void;
}

@injectable()
export class Dispatcher implements IDispatcher {

  private readonly reducer: Reducer;
  private inDispatch: boolean;
  private store: IStore;
  private config: IConfig;
  private loggerFactory: ILoggerFactory;

  private _logger: ILogger;

  private get logger() {
    if (this._logger) {
      return this._logger;
    }

    this._logger = this.loggerFactory.createLog({
      name: 'Dispatcher',
      loggerLevel: this.config.DISPATCHER_LOG_LEVEL
    });

    return this._logger;
  };

  constructor(
    @inject(IOC_TYPE.REDUCER) reducer: Reducer,
    @inject(IOC_TYPE.STORE) store: IStore,
    @inject(IOC_TYPE.CONFIG) config: IConfig,
    @inject(IOC_TYPE.LOGGER_FACTORY) loggerFactory: ILoggerFactory) {
      this.reducer = reducer;
      this.store = store;
      this.config = config;
      this.loggerFactory = loggerFactory;
  }

  public dispatch(action: ActionType) {
    if (this.inDispatch) {
      const message = 'Cannot dispatch while in a dispatch!';
      this.logger.error(message);
      throw new Error(message);
    }

    try {
      this.inDispatch = true;
      const newState = this.reducer(this.store.state, action);
      this.store.updateState(newState);
    }
    finally {
      this.inDispatch = false;
    }
  }
}

import {IAuthActionLogic, AuthActionLogic} from './auth-action-logic';
import {IExampleActionLogic, ExampleActionLogic} from './example-action-logic';
import {IInitializerActionLogic, InitializerActionLogic} from './initializer-action-logic';
import {BaseActionLogic} from './base-action-logic';
import {IDispatcher} from '../dispatcher';
import {IAPIServiceFactory} from '../../api';
import {IEventEmitter} from '../event';
import {IStore} from '../store';
import {IOC_TYPE} from '../../ioc/ioc-type';
import {IConfig} from '../../config';

import {ILoggerFactory} from 'articulog';
import {injectable, inject} from 'inversify';

export interface IActionLogic {
  readonly authActionLogic: IAuthActionLogic;
  readonly exampleActionLogic: IExampleActionLogic;
  readonly initializerActionLogic: IInitializerActionLogic;
}

@injectable()
export class ActionLogic extends BaseActionLogic implements IActionLogic {

  public readonly authActionLogic: IAuthActionLogic;
  public readonly exampleActionLogic: IExampleActionLogic;
  public readonly initializerActionLogic: IInitializerActionLogic;

  constructor(
    @inject(IOC_TYPE.DISPATCHER) dispatcher: IDispatcher,
    @inject(IOC_TYPE.API_SERVICE_FACTORY) apiFactory: IAPIServiceFactory,
    @inject(IOC_TYPE.EVENT_EMITTER) eventEmitter: IEventEmitter,
    @inject(IOC_TYPE.STORE) store: IStore,
    @inject(IOC_TYPE.LOGGER_FACTORY) loggerFactory: ILoggerFactory,
    @inject(IOC_TYPE.CONFIG) config: IConfig) {
      super(dispatcher, apiFactory.create(), eventEmitter, store, loggerFactory, config);


      this.authActionLogic = new AuthActionLogic(
        dispatcher, apiFactory.create(), eventEmitter, store, loggerFactory, config);
      this.exampleActionLogic = new ExampleActionLogic(
        dispatcher, apiFactory.create(), eventEmitter, store, loggerFactory, config);
      this.initializerActionLogic = new InitializerActionLogic(
        dispatcher, apiFactory.create(), eventEmitter, store, loggerFactory, config);
  }

}
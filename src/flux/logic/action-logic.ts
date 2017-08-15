import {IAuthActionLogic, AuthActionLogic} from 'flux/logic/auth-action-logic';
import {IExampleActionLogic, ExampleActionLogic} from 'flux/logic/example-action-logic';
import {IInitializerActionLogic, InitializerActionLogic} from 'flux/logic/initializer-action-logic';
import {WebSocketConnectionActionLogic} from 'flux/logic/ws-connection-action-logic';
import {BaseActionLogic} from 'flux/logic/base-action-logic';
import {IDispatcher} from 'flux/dispatcher';
import {IAPIServiceFactory} from 'api';
import {IEventEmitter} from 'flux/event';
import {IStore} from 'flux/store';
import {IOC_TYPE} from 'ioc/ioc-type';
import {IConfig} from 'interface';

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

  private readonly webSocketConnectionActionLogic: WebSocketConnectionActionLogic;

  constructor(
    @inject(IOC_TYPE.DISPATCHER) dispatcher: IDispatcher,
    @inject(IOC_TYPE.API_SERVICE_FACTORY) apiFactory: IAPIServiceFactory,
    @inject(IOC_TYPE.EVENT_EMITTER) eventEmitter: IEventEmitter,
    @inject(IOC_TYPE.STORE) store: IStore,
    @inject(IOC_TYPE.LOGGER_FACTORY) loggerFactory: ILoggerFactory,
    @inject(IOC_TYPE.CONFIG) config: IConfig) {
      super(dispatcher, apiFactory.create(), eventEmitter, store, loggerFactory, config);

      this.authActionLogic = new AuthActionLogic(
        dispatcher, this.api, eventEmitter, store, loggerFactory, config);
      this.exampleActionLogic = new ExampleActionLogic(
        dispatcher, this.api, eventEmitter, store, loggerFactory, config);
      this.initializerActionLogic = new InitializerActionLogic(
        dispatcher, this.api, eventEmitter, store, loggerFactory, config);

      this.webSocketConnectionActionLogic = new WebSocketConnectionActionLogic(
        dispatcher, this.api, eventEmitter, store, loggerFactory, config);
  }

}

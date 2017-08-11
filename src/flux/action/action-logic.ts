import {IAuthActionLogic, AuthActionLogic} from './auth-action-logic';
import {IExampleActionLogic, ExampleActionLogic} from './example-action-logic';
import {IInitializerActionLogic, InitializerActionLogic} from './initializer-action-logic';
import {BaseActionLogic} from './base-action-logic';
import {IDispatcher} from '../dispatcher';
import {IAPIService} from '../../api';
import {IEventEmitter} from '../event';
import {IStore} from '../store';
import {IOC_TYPES} from '../../ioc-container';

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
    @inject(IOC_TYPES.DISPATCHER) dispatcher: IDispatcher,
    @inject(IOC_TYPES.API_SERVICE) api: IAPIService,
    @inject(IOC_TYPES.EVENT_EMITTER) eventEmitter: IEventEmitter,
    @inject(IOC_TYPES.STORE) store: IStore) {
      super(dispatcher, api, eventEmitter, store);

      this.authActionLogic = new AuthActionLogic(dispatcher, api, eventEmitter, store);
      this.exampleActionLogic = new ExampleActionLogic(dispatcher, api, eventEmitter, store);
      this.initializerActionLogic = new InitializerActionLogic(dispatcher, api, eventEmitter, store);
  }

}

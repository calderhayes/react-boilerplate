import {IDispatcher} from 'flux/dispatcher';
import {IAPIService} from 'api';
import {IEventEmitter, makeSomeoneSaidHelloEvent} from 'flux/event';
import {IStore} from 'flux/store';
import {BaseActionLogic} from 'flux/logic/base-action-logic';
import {makeExampleAction} from 'flux/action';
import {IConfig} from 'interface';

import {ILoggerFactory} from 'articulog';

export interface IExampleActionLogic {
  doExample(): Promise<void>;
  sayHello(): Promise<void>;
}

export class ExampleActionLogic extends BaseActionLogic
  implements IExampleActionLogic {

  constructor(
    dispatcher: IDispatcher,
    api: IAPIService,
    eventEmitter: IEventEmitter,
    store: IStore,
    loggerFactory: ILoggerFactory,
    config: IConfig) {
      super(dispatcher, api, eventEmitter, store, loggerFactory, config);

      this.api.HelloService.registerSomeoneSaidHi(this.someoneSaidHi);
  }

  public async doExample() {
    this.logger.info('Doing example...');

    const newVal = (new Date()).getTime() + this.store.state.exampleValue;
    const action = makeExampleAction(newVal);

    this.dispatcher.dispatch(action);

    this.emitStateChange();

    return await Promise.resolve();
  }

  public async sayHello() {
    return await this.api.HelloService.sayHello();
  }

  private readonly someoneSaidHi = (username: string) => {
    this.logger.info('SOMEONE SAID HI! => ' + username);
    const event = makeSomeoneSaidHelloEvent(username);
    this.eventEmitter.emit(event);
  }
}

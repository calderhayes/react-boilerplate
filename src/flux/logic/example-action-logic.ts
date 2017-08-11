import {IDispatcher} from '../dispatcher';
import {IAPIService} from '../../api';
import {IEventEmitter, EventTypeKey} from '../event';
import {IStore} from '../store';
import {BaseActionLogic} from './base-action-logic';
import {makeExampleAction} from '../action';
import {IConfig} from '../../config';

import {ILoggerFactory} from 'articulog';

export interface IExampleActionLogic {
  doExample(): Promise<void>;
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

  }

  public async doExample() {
    this.logger.info('Doing example...');

    const newVal = (new Date()).getTime() + this.store.state.exampleValue;
    const action = makeExampleAction(newVal);

    this.dispatcher.dispatch(action);

    this.eventEmitter.emit({
      type: EventTypeKey.EXAMPLE
    });

    return await Promise.resolve();

  }

}

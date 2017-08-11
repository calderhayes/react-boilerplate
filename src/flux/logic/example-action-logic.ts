import {IDispatcher} from '../dispatcher';
import {IAPIService} from '../../api';
import {IEventEmitter} from '../event';
import {IStore} from '../store';
import {BaseActionLogic} from './base-action-logic';
import {makeExampleAction} from '../action';

export interface IExampleActionLogic {
  doExample(): Promise<void>;
}

export class ExampleActionLogic extends BaseActionLogic
  implements IExampleActionLogic {

  constructor(
    dispatcher: IDispatcher,
    api: IAPIService,
    eventEmitter: IEventEmitter,
    store: IStore) {
      super(dispatcher, api, eventEmitter, store);

  }

  public async doExample() {
    this.log.info('Doing example...');

    const newVal = (new Date()).getTime() + this.store.state.exampleValue;
    const action = makeExampleAction(newVal);

    this.dispatcher.dispatch(action);

    this.eventEmitter.emit('temp!');

    return await Promise.resolve();

  }

}

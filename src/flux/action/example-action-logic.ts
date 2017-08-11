import {IOC_TYPES} from '../../ioc-container';
import {IDispatcher} from '../dispatcher';
import {IAPIService} from '../../api';
import {IEventEmitter} from '../event';
import {IStore} from '../store';
import {BaseActionLogic} from './base-action-logic';
import {makeExampleAction} from './action-type';

import {inject, injectable} from 'inversify';

export interface IExampleActionLogic {
  doExample(): Promise<void>;
}

@injectable()
export class ExampleActionLogic extends BaseActionLogic
  implements IExampleActionLogic {

  constructor(
    @inject(IOC_TYPES.DISPATCHER) dispatcher: IDispatcher,
    @inject(IOC_TYPES.API_SERVICE) api: IAPIService,
    @inject(IOC_TYPES.EVENT_EMITTER) eventEmitter: IEventEmitter,
    @inject(IOC_TYPES.STORE) store: IStore) {
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

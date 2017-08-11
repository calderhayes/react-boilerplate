import {IOC_TYPES} from '../../ioc-container';
import {IDispatcher} from '../dispatcher';
import {IAPIService} from '../../api';
import {IEventEmitter} from '../event';
import {IStore} from '../store';
import {BaseActionLogic} from './base-action-logic';
import {makeInitializeAppRouteAction} from './action-type';

import {inject, injectable} from 'inversify';

export interface IInitializerActionLogic {
  initializeAppRoute(): Promise<void>;
}

@injectable()
export class InitializerActionLogic extends BaseActionLogic {

  constructor(
    @inject(IOC_TYPES.DISPATCHER) dispatcher: IDispatcher,
    @inject(IOC_TYPES.API_SERVICE) api: IAPIService,
    @inject(IOC_TYPES.EVENT_EMITTER) eventEmitter: IEventEmitter,
    @inject(IOC_TYPES.STORE) store: IStore) {
      super(dispatcher, api, eventEmitter, store);

  }

  public async initializeAppRoute() {
    this.log.info('Initializing the App Route');

    // This will likely be a batched set of API calls
    // Or a special call to a single point which provides all
    // the data
    await new Promise((resolve) => {
      const dummyTimeout = 1000;
      setTimeout(resolve, dummyTimeout);
    });

    const action = makeInitializeAppRouteAction(true);

    this.dispatcher.dispatch(action);

    // const updatedState = this.store.getState();
    this.eventEmitter.emit('temp2!', {
      success: true
    });
  }

}

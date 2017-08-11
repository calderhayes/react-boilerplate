import {IDispatcher} from '../dispatcher';
import {IAPIService} from '../../api';
import {IEventEmitter, EventTypeKey} from '../event';
import {IStore} from '../store';
import {BaseActionLogic} from './base-action-logic';
import {makeInitializeAppRouteAction} from '../action';
import {initializeTranslationData} from '../../util/i18n';
import {IConfig} from '../../config';

import {ILoggerFactory} from 'articulog';

export interface IInitializerActionLogic {
  initializeAppRoute(): Promise<void>;
}

export class InitializerActionLogic extends BaseActionLogic {

  constructor(
    dispatcher: IDispatcher,
    api: IAPIService,
    eventEmitter: IEventEmitter,
    store: IStore,
    loggerFactory: ILoggerFactory,
    config: IConfig) {
      super(dispatcher, api, eventEmitter, store, loggerFactory, config);

  }

  public async initializeAppRoute() {
    this.logger.info('Initializing the App Route');

    // TODO: Dynamically get locale
    const locale = 'en-CA';
    await initializeTranslationData(locale);

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
    this.eventEmitter.emit({
      type: EventTypeKey.APP_ROUTE_INITIALIZED,
      success: true
    });
  }

}

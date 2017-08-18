import {IDispatcher} from 'flux/dispatcher';
import {IAPIService} from 'api';
import {IEventEmitter} from 'flux/event';
import {IStore} from 'flux/store';
import {BaseActionLogic} from './base-action-logic';
import { makeInitializeAppRouteAction, makeWebSocketConnectionStateChangedAction } from 'flux/action';
import {initializeTranslationData} from 'util/i18n';
import { IConfig, WebSocketConnectionState } from 'interface';
import {StateHelpers} from 'data';

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
    try {
      this.logger.info('Initializing the App Route');

      const startWSConnection = StateHelpers.isLoggedIn(this.store.state) &&
      this.store.state.webSocketConnectionState === WebSocketConnectionState.DISCONNECTED;
      if (startWSConnection) {
        try {
          await this.api.startWebSocketConnection(this.store.state.authInfo.accessToken);

          // Assuming successful connection, otherwise error
          const state = WebSocketConnectionState.CONNECTED;
          const wsAction = makeWebSocketConnectionStateChangedAction(state);
          this.dispatcher.dispatch(wsAction);
          // this.eventEmitter.emit(makeWebSocketConnectionStateChangedEvent(state));
        }
        catch (error) {
          this.logger.error('Failed to automatically reconnect to websockets', error);
          throw error;
        }
      }
      else {
        this.logger.debug('no ws', this.store.state.authInfo, this.store.state.webSocketConnectionState);
      }

      // TODO: Dynamically get locale
      const locale = 'en-CA';
      await initializeTranslationData(locale);

      // This will likely be a batched set of API calls
      // Or a special call to a single point which provides all
      // the data
      await new Promise((resolve) => {
        const dummyTimeout = 1;
        setTimeout(resolve, dummyTimeout);
      });

      const action = makeInitializeAppRouteAction(true);

      this.dispatcher.dispatch(action);
      this.emitStateChange();
    }
    catch (error) {
      this.unknownErrorHandler(error);
    }
  }

}

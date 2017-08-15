import {IDispatcher} from 'flux/dispatcher';
import {IAPIService} from 'api';
import {IEventEmitter} from 'flux/event';
import {IStore} from 'flux/store';
import {BaseActionLogic} from 'flux/logic/base-action-logic';
import {makeWebSocketConnectionStateChangedAction} from 'flux/action';
import {WebSocketConnectionState} from 'interface';
import {ILoggerFactory} from 'articulog';
import {IConfig} from 'interface';
import {IWebSocketConnectionStateChangedEvent, EventTypeKey} from 'flux/event';

export class WebSocketConnectionActionLogic extends BaseActionLogic {

  constructor(
    dispatcher: IDispatcher,
    api: IAPIService,
    eventEmitter: IEventEmitter,
    store: IStore,
    loggerFactory: ILoggerFactory,
    config: IConfig) {
      super(dispatcher, api, eventEmitter, store, loggerFactory, config);

      api.webSocketEventManager.registerErrorHandler(this.websocketError);
      api.webSocketEventManager.registerConnectionSlowHandler(this.connectionSlow);
      api.webSocketEventManager.registerReconnectingHandler(this.reconnecting);
      api.webSocketEventManager.registerReconnectedHandler(this.reconnected);
      api.webSocketEventManager.registerDisconnectedHandler(this.disconnected);
  }

  private websocketError = (error: any) => {
    this.logger.error('An unknown websockets error occured: ', error);
    this.launchEmit(WebSocketConnectionState.ERROR);
  }

  private connectionSlow = () => {
    this.logger.info('Web Sockets Connection slow');
    this.launchEmit(WebSocketConnectionState.SLOW);
  }

  private reconnecting = () => {
    this.logger.info('Web Sockets Reconnecting');
    this.launchEmit(WebSocketConnectionState.RECONNECTING);
  }

  private reconnected = () => {
    this.logger.info('Web Sockets Reconnected');
    this.launchEmit(WebSocketConnectionState.CONNECTED);
  }

  private disconnected = (lastError: any) => {
    this.logger.error('Web Sockets disconnected', lastError);
    this.launchEmit(WebSocketConnectionState.DISCONNECTED);
  }

  private launchEmit = (state: WebSocketConnectionState) => {
    const action = makeWebSocketConnectionStateChangedAction(state);
    this.dispatcher.dispatch(action);

    const event: IWebSocketConnectionStateChangedEvent = {
      type: EventTypeKey.WEB_SOCKET_CONNECTION_STATE_CHANGED,
      webSocketConnectionState: state
    };

    this.eventEmitter.emit(event);
  }
}

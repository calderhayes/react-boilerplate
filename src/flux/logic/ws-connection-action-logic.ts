import {IDispatcher} from 'flux/dispatcher';
import {IAPIService} from 'api';
import {IEventEmitter} from 'flux/event';
import {IStore} from 'flux/store';
import {BaseActionLogic} from 'flux/logic/base-action-logic';
import {makeWebSocketConnectionStateChangedAction, WebSocketConnectionState} from 'flux/action';
import {ILoggerFactory} from 'articulog';
import {IConfig} from 'config';

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
    const action = makeWebSocketConnectionStateChangedAction(WebSocketConnectionState.ERROR);
    this.dispatcher.dispatch(action);
  }

  private connectionSlow = () => {
    this.logger.info('Web Sockets Connection slow');
    const action = makeWebSocketConnectionStateChangedAction(WebSocketConnectionState.SLOW);
    this.dispatcher.dispatch(action);
  }

  private reconnecting = () => {
    this.logger.info('Web Sockets Reconnecting');
    const action = makeWebSocketConnectionStateChangedAction(WebSocketConnectionState.RECONNECTING);
    this.dispatcher.dispatch(action);
  }

  private reconnected = () => {
    this.logger.info('Web Sockets Reconnected');
    const action = makeWebSocketConnectionStateChangedAction(WebSocketConnectionState.RECONNECTED);
    this.dispatcher.dispatch(action);
  }

  private disconnected = (lastError: any) => {
    this.logger.error('Web Sockets disconnected', lastError);
    const action = makeWebSocketConnectionStateChangedAction(WebSocketConnectionState.DISCONNECTED);
    this.dispatcher.dispatch(action);
  }

}
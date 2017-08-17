import {WebSocketConnectionState} from 'interface';

export enum EventTypeKey {
  APP_STATE_UPDATED = 'APP_STATE_UPDATED',
  LOGIN = 'LOGIN',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  WEB_SOCKET_CONNECTION_STATE_CHANGED = 'WEB_SOCKET_CONNECTION_STATE_CHANGED'
};

export interface IAppStateUpdated {
  type: EventTypeKey.APP_STATE_UPDATED;
}

export interface ILoginEvent {
  type: EventTypeKey.LOGIN;
  result: {
    success: boolean;
    error?: string;
  };
};

export interface IUnknownErrorEvent {
  type: EventTypeKey.UNKNOWN_ERROR;
  error: any;
};

export interface IWebSocketConnectionStateChangedEvent {
  type: EventTypeKey.WEB_SOCKET_CONNECTION_STATE_CHANGED;
  webSocketConnectionState: WebSocketConnectionState;
}

export type EventType =
  IAppStateUpdated
  | ILoginEvent
  | IUnknownErrorEvent
  | IWebSocketConnectionStateChangedEvent;

import {WebSocketConnectionState} from 'interface';

export enum EventTypeKey {
  APP_STATE_UPDATED = 'APP_STATE_UPDATED',
  LOGIN = 'LOGIN',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  WEB_SOCKET_CONNECTION_STATE_CHANGED = 'WEB_SOCKET_CONNECTION_STATE_CHANGED',
  SOMEONE_SAID_HELLO = 'SOMEONE_SAID_HELLO'
};

export interface IAppStateUpdated {
  type: EventTypeKey.APP_STATE_UPDATED;
}

export const makeAppStateUpdatedEvent = () => {
  const obj: IAppStateUpdated = {
    type: EventTypeKey.APP_STATE_UPDATED
  };

  return obj;
};

export interface ILoginEvent {
  type: EventTypeKey.LOGIN;
  result: {
    success: boolean;
    error?: string;
  };
};

export const makeLoginEvent = (result: { success: boolean, error?: string }) => {
  const obj: ILoginEvent = {
    type: EventTypeKey.LOGIN,
    result
  };

  return obj;
};

export interface IUnknownErrorEvent {
  type: EventTypeKey.UNKNOWN_ERROR;
  error: any;
};

export const makeUnknownErrorEvent = (error: any) => {
  const event: IUnknownErrorEvent = {
    type: EventTypeKey.UNKNOWN_ERROR,
    error
  };

  return event;
};

export interface IWebSocketConnectionStateChangedEvent {
  type: EventTypeKey.WEB_SOCKET_CONNECTION_STATE_CHANGED;
  webSocketConnectionState: WebSocketConnectionState;
}

export const makeWebSocketConnectionStateChangedEvent = (state: WebSocketConnectionState) => {
  const event: IWebSocketConnectionStateChangedEvent = {
    type: EventTypeKey.WEB_SOCKET_CONNECTION_STATE_CHANGED,
    webSocketConnectionState: state
  };

  return event;
};

export interface ISomeoneSaidHelloEvent {
  type: EventTypeKey.SOMEONE_SAID_HELLO;
  username: string;
}

export const makeSomeoneSaidHelloEvent = (username: string) => {
  const event: ISomeoneSaidHelloEvent = {
    type: EventTypeKey.SOMEONE_SAID_HELLO,
    username
  };

  return event;
};

export type EventType =
  IAppStateUpdated
  | ILoginEvent
  | IUnknownErrorEvent
  | IWebSocketConnectionStateChangedEvent
  | ISomeoneSaidHelloEvent;

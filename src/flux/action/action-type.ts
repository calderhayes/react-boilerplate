import * as Model from 'api/models';

export enum ActionTypeKey {
  EXAMPLE = 'EXAMPLE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  APP_ROUTE_INITIALIZED = 'APP_ROUTE_INITIALIZED',
  WEB_SOCKET_CONNECTION_STATE_CHANGED = 'WEB_SOCKET_CONNECTION_STATE_CHANGED',
  OTHER_ACTION = '__any_other_action_type__'
}

export interface IExampleAction {
  type: ActionTypeKey.EXAMPLE;
  value: number;
}

export const makeExampleAction = (value: number) => {
  const obj: IExampleAction = {
    type: ActionTypeKey.EXAMPLE,
    value
  };

  return obj;
};

export interface ILoginAction {
  type: ActionTypeKey.LOGIN;
  tokenData: Model.IOAuth2Token;
}

export const makeLoginAction = (tokenData: Model.IOAuth2Token) => {
  const obj: ILoginAction = {
    type: ActionTypeKey.LOGIN,
    tokenData
  };

  return obj;
};

export interface IInitializeAppRouteAction {
  type: ActionTypeKey.APP_ROUTE_INITIALIZED;
  success: boolean;
}

export const makeInitializeAppRouteAction = (success: boolean) => {
  const obj: IInitializeAppRouteAction = {
    type: ActionTypeKey.APP_ROUTE_INITIALIZED,
    success
  };

  return obj;
};

export interface ILogoutAction {
  type: ActionTypeKey.LOGOUT;
}

export const makeLogoutAction = () => {
  const obj: ILogoutAction = {
    type: ActionTypeKey.LOGOUT
  };

  return obj;
};


export enum WebSocketConnectionState {
  SLOW = 0,
  RECONNECTING = 1,
  RECONNECTED = 2,
  DISCONNECTED = 3,
  ERROR = 4
}

export interface IWebSocketConnectionStateChanged {
  type: ActionTypeKey.WEB_SOCKET_CONNECTION_STATE_CHANGED,
  newState: WebSocketConnectionState;
}

export const makeWebSocketConnectionStateChangedAction = (newState: WebSocketConnectionState) => {
  const obj: IWebSocketConnectionStateChanged = {
    type: ActionTypeKey.WEB_SOCKET_CONNECTION_STATE_CHANGED,
    newState
  };
  return obj;
}

export interface IOtherAction {
  type: ActionTypeKey.OTHER_ACTION;
}

export type ActionType =
  IExampleAction
  | ILoginAction
  | IInitializeAppRouteAction
  | ILogoutAction
  | IWebSocketConnectionStateChanged
  | IOtherAction;

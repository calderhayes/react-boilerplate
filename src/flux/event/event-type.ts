export enum EventTypeKey {
  LOGIN = 'LOGIN',
  EXAMPLE = 'EXAMPLE',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  APP_ROUTE_INITIALIZED = 'APP_ROUTE_INITIALIZED',
  LOGOUT = 'LOGOUT'
};

export interface ILoginEvent {
  type: EventTypeKey.LOGIN;
  result: {
    success: boolean,
    error?: string
  };
};

export interface IExampleEvent {
  type: EventTypeKey.EXAMPLE;
};

export interface IUnknownErrorEvent {
  type: EventTypeKey.UNKNOWN_ERROR;
  error: any;
};

export interface IAppRouteInitializedEvent {
  type: EventTypeKey.APP_ROUTE_INITIALIZED;
  success: boolean;
};

export interface ILogoutEvent {
  type: EventTypeKey.LOGOUT;
};

export type EventType =
  ILoginEvent
  | IUnknownErrorEvent
  | IAppRouteInitializedEvent
  | IExampleEvent
  | ILogoutEvent;
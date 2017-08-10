import * as Model from '../../api/models';

// TODO: Split these off of index
export enum TypeKeys {
  EXAMPLE = 'EXAMPLE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  APP_ROUTE_INITIALIZED = 'APP_ROUTE_INITIALIZED',
  OTHER_ACTION = '__any_other_action_type__'
}

export interface IExampleAction {
  type: TypeKeys.EXAMPLE;
  value: number;
}

export interface ILoginAction {
  type: TypeKeys.LOGIN;
  tokenData: Model.IOAuth2TokenResult;
}

export interface IInitializeAppRouteAction {
  type: TypeKeys.APP_ROUTE_INITIALIZED;
  success: boolean;
}

export interface ILogoutAction {
  type: TypeKeys.LOGOUT;
}

export interface IOtherAction {
  type: TypeKeys.OTHER_ACTION;
}

export type ActionTypes =
  IExampleAction
  | ILoginAction
  | IInitializeAppRouteAction
  | ILogoutAction
  | IOtherAction;

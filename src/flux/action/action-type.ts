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

export const makeExampleAction = (value: number) => {
  const obj: IExampleAction = {
    type: TypeKeys.EXAMPLE,
    value
  };

  return obj;
};

export interface ILoginAction {
  type: TypeKeys.LOGIN;
  tokenData: Model.IOAuth2TokenResult;
}

export const makeLoginAction = (tokenData: Model.IOAuth2TokenResult) => {
  const obj: ILoginAction = {
    type: TypeKeys.LOGIN,
    tokenData
  };

  return obj;
};

export interface IInitializeAppRouteAction {
  type: TypeKeys.APP_ROUTE_INITIALIZED;
  success: boolean;
}

export const makeInitializeAppRouteAction = (success: boolean) => {
  const obj: IInitializeAppRouteAction = {
    type: TypeKeys.APP_ROUTE_INITIALIZED,
    success
  };

  return obj;
};

export interface ILogoutAction {
  type: TypeKeys.LOGOUT;
}

export const makeLogoutAction = () => {
  const obj: ILogoutAction = {
    type: TypeKeys.LOGOUT
  };

  return obj;
};

export interface IOtherAction {
  type: TypeKeys.OTHER_ACTION;
}

export type ActionTypes =
  IExampleAction
  | ILoginAction
  | IInitializeAppRouteAction
  | ILogoutAction
  | IOtherAction;

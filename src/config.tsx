
import * as Immutable from 'immutable';

// Provided by webpack
declare const ENVIRONMENT: string;

export enum EnvironmentType {
  LOCAL,
  LOCAL_DEV
}

export interface IConfig {
  ACTION_LOG_LEVEL: LogLevel;
  ENVIRONMENT: EnvironmentType;
  API_URL: string;
  AUTH_URL: string;
  USE_ASSERTIONS: boolean;
  GENERAL_LOG_LEVEL: LogLevel;
  API_LOG_LEVEL: LogLevel;
  DISPATCHER_LOG_LEVEL: LogLevel;
  REACT_LOG_LEVEL: LogLevel;
}

class ConfigurationConstants {

  public static LOCAL: string = 'LOCAL'; // self contained
  public static LOCAL_DEV: string = 'LOCAL_DEV';

}

let config: IConfig = null;

if (typeof ENVIRONMENT === 'undefined' || !ENVIRONMENT || ENVIRONMENT === ConfigurationConstants.LOCAL) {
  config = {
    ACTION_LOG_LEVEL: LogLevel.DEBUG,
    API_LOG_LEVEL: LogLevel.DEBUG,
    API_URL: '',
    AUTH_URL: '',
    DISPATCHER_LOG_LEVEL: LogLevel.DEBUG,
    ENVIRONMENT: EnvironmentType.LOCAL,
    GENERAL_LOG_LEVEL: LogLevel.DEBUG,
    REACT_LOG_LEVEL: LogLevel.DEBUG,
    USE_ASSERTIONS: true
  };
}
else if (ENVIRONMENT === ConfigurationConstants.LOCAL_DEV) {
  config = {
    ACTION_LOG_LEVEL: LogLevel.DEBUG,
    API_LOG_LEVEL: LogLevel.DEBUG,
    API_URL: '',
    AUTH_URL: 'http://localhost:5050',
    DISPATCHER_LOG_LEVEL: LogLevel.DEBUG,
    ENVIRONMENT: EnvironmentType.LOCAL_DEV,
    GENERAL_LOG_LEVEL: LogLevel.DEBUG,
    REACT_LOG_LEVEL: LogLevel.DEBUG,
    USE_ASSERTIONS: true
  };
}
else {
  throw 'Not implemented';
}

// temp
config = {
  ACTION_LOG_LEVEL: LogLevel.DEBUG,
  API_LOG_LEVEL: LogLevel.DEBUG,
  API_URL: '',
  AUTH_URL: 'http://localhost:5050',
  DISPATCHER_LOG_LEVEL: LogLevel.DEBUG,
  ENVIRONMENT: EnvironmentType.LOCAL_DEV,
  GENERAL_LOG_LEVEL: LogLevel.DEBUG,
  REACT_LOG_LEVEL: LogLevel.DEBUG,
  USE_ASSERTIONS: true
};

export const Config: IConfig = new (Immutable.Record(config) as any)();

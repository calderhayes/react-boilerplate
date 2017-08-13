
import {LoggerLevel} from 'articulog';

// Provided by webpack
declare const ENVIRONMENT: string;

// TODO: Make node standard development and production (possibly test) environment values
export enum EnvironmentType {
  LOCAL = 'LOCAL',
  LOCAL_DEV = 'LOCAL_DEV'
}

export interface IConfig {
  ACTION_LOG_LEVEL: LoggerLevel;
  ENVIRONMENT: EnvironmentType;
  API_LIVE_ENABLED: boolean;
  API_URL: string;
  AUTH_URL: string;
  USE_ASSERTIONS: boolean;
  GENERAL_LOG_LEVEL: LoggerLevel;
  API_LOG_LEVEL: LoggerLevel;
  DISPATCHER_LOG_LEVEL: LoggerLevel;
  REACT_LOG_LEVEL: LoggerLevel;
}

class ConfigurationConstants {

  public static LOCAL: string = 'LOCAL'; // self contained
  public static LOCAL_DEV: string = 'LOCAL_DEV';

}

let config: IConfig = null;

if (typeof ENVIRONMENT === 'undefined' || !ENVIRONMENT || ENVIRONMENT === ConfigurationConstants.LOCAL) {
  config = {
    API_LIVE_ENABLED: true,
    ACTION_LOG_LEVEL: LoggerLevel.DEBUG,
    API_LOG_LEVEL: LoggerLevel.DEBUG,
    API_URL: '',
    AUTH_URL: '',
    DISPATCHER_LOG_LEVEL: LoggerLevel.DEBUG,
    ENVIRONMENT: EnvironmentType.LOCAL,
    GENERAL_LOG_LEVEL: LoggerLevel.DEBUG,
    REACT_LOG_LEVEL: LoggerLevel.DEBUG,
    USE_ASSERTIONS: true
  };
}
else if (ENVIRONMENT === ConfigurationConstants.LOCAL_DEV) {
  config = {
    API_LIVE_ENABLED: false,
    ACTION_LOG_LEVEL: LoggerLevel.DEBUG,
    API_LOG_LEVEL: LoggerLevel.DEBUG,
    API_URL: '',
    AUTH_URL: 'http://localhost:5050',
    DISPATCHER_LOG_LEVEL: LoggerLevel.DEBUG,
    ENVIRONMENT: EnvironmentType.LOCAL_DEV,
    GENERAL_LOG_LEVEL: LoggerLevel.DEBUG,
    REACT_LOG_LEVEL: LoggerLevel.DEBUG,
    USE_ASSERTIONS: true
  };
}
else {
  throw 'Not implemented';
}

// temp
/*config = {
  ACTION_LOG_LEVEL: LoggerLevel.DEBUG,
  API_LOG_LEVEL: LoggerLevel.DEBUG,
  API_URL: '',
  AUTH_URL: 'http://localhost:5050',
  DISPATCHER_LOG_LEVEL: LoggerLevel.DEBUG,
  ENVIRONMENT: EnvironmentType.LOCAL_DEV,
  GENERAL_LOG_LEVEL: LoggerLevel.DEBUG,
  REACT_LOG_LEVEL: LoggerLevel.DEBUG,
  USE_ASSERTIONS: true
};*/

config = Object.freeze(config);
export {config};

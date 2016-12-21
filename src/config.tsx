
import * as logging from 'loglevel';

// Provided by webpack
declare const ENVIRONMENT: string;

export enum EnvironmentType {
  LOCAL,
  LOCAL_DEV
}

export interface IConfig {
  ENVIRONMENT: EnvironmentType;
  API_URL: string;
  USE_ASSERTIONS: boolean;
  GENERAL_LOG_LEVEL: LogLevel;
  API_LOG_LEVEL: LogLevel;
}

class ConfigurationConstants {

  static LOCAL: string = 'LOCAL'; // self contained
  static LOCAL_DEV: string = 'LOCAL_DEV';

}

let config: IConfig = null;

if (ENVIRONMENT === ConfigurationConstants.LOCAL) {
  config = {
    ENVIRONMENT: EnvironmentType.LOCAL,
    API_URL: '',
    USE_ASSERTIONS: true,
    GENERAL_LOG_LEVEL: LogLevel.DEBUG,
    API_LOG_LEVEL: LogLevel.DEBUG
  };
}
else {
  throw 'Not implemented';
}

// TODO: Make this immutable
export const Config = config;

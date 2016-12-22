
import * as Immutable from 'immutable';

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

  public static LOCAL: string = 'LOCAL'; // self contained
  public static LOCAL_DEV: string = 'LOCAL_DEV';

}

let config: IConfig = null;

if (ENVIRONMENT === ConfigurationConstants.LOCAL) {
  config = {
    API_LOG_LEVEL: LogLevel.DEBUG,
    API_URL: '',
    ENVIRONMENT: EnvironmentType.LOCAL,
    GENERAL_LOG_LEVEL: LogLevel.DEBUG,
    USE_ASSERTIONS: true
  };
}
else {
  throw 'Not implemented';
}

export const Config: IConfig = new (Immutable.Record(config) as any);

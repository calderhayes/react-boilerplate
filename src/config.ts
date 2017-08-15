
import {LoggerLevel} from 'articulog';
import {IConfig, EnvironmentType} from 'interface';

// Provided by webpack
declare const ENVIRONMENT: string;
declare const LIVE: string;

let config: IConfig = null;

if (typeof ENVIRONMENT === 'undefined' || !ENVIRONMENT || ENVIRONMENT === EnvironmentType.development) {
  config = {
    API_LIVE_ENABLED: LIVE === 'true',
    ACTION_LOG_LEVEL: LoggerLevel.DEBUG,
    API_LOG_LEVEL: LoggerLevel.DEBUG,
    API_URL: 'http://localhost:5080',
    AUTH_URL: 'http://localhost:5050',
    DISPATCHER_LOG_LEVEL: LoggerLevel.DEBUG,
    ENVIRONMENT: EnvironmentType.development,
    GENERAL_LOG_LEVEL: LoggerLevel.DEBUG,
    REACT_LOG_LEVEL: LoggerLevel.DEBUG,
    USE_ASSERTIONS: true
  };
}
else if (ENVIRONMENT === EnvironmentType.production) {
  config = {
    API_LIVE_ENABLED: LIVE === 'true',
    ACTION_LOG_LEVEL: LoggerLevel.DEBUG,
    API_LOG_LEVEL: LoggerLevel.DEBUG,
    API_URL: '',
    AUTH_URL: 'http://localhost:5050',
    DISPATCHER_LOG_LEVEL: LoggerLevel.DEBUG,
    ENVIRONMENT: EnvironmentType.production,
    GENERAL_LOG_LEVEL: LoggerLevel.DEBUG,
    REACT_LOG_LEVEL: LoggerLevel.DEBUG,
    USE_ASSERTIONS: true
  };
}
else {
  throw `Environment type ${ENVIRONMENT} Not implemented`;
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

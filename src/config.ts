
import {LoggerLevel} from 'articulog';
import {IConfig, EnvironmentType} from 'interface';

// Provided by webpack
declare const ENVIRONMENT: string;
declare const LIVE: string;

let config: IConfig = null;

if (typeof ENVIRONMENT === 'undefined' || !ENVIRONMENT || ENVIRONMENT === EnvironmentType.DEVELOPMENT) {
  config = {
    ENVIRONMENT: EnvironmentType.DEVELOPMENT,
    API_LIVE_ENABLED: LIVE === 'true',
    API_URL: 'http://localhost:5080',
    AUTH_URL: 'http://localhost:5050',
    LOGGING: {
      ACTION_LOG_LEVEL: LoggerLevel.DEBUG,
      API_LOG_LEVEL: LoggerLevel.DEBUG,
      DISPATCHER_LOG_LEVEL: LoggerLevel.DEBUG,
      GENERAL_LOG_LEVEL: LoggerLevel.DEBUG,
      REACT_LOG_LEVEL: LoggerLevel.DEBUG,
      USE_ASSERTIONS: true
    },
    PERSIST_ACCESS_TOKENS: true,
    REFRESH_TOKEN_INTERVAL: 30
  };
}
else if (ENVIRONMENT === EnvironmentType.PRODUCTION) {
  config = {
    ENVIRONMENT: EnvironmentType.DEVELOPMENT,
    API_LIVE_ENABLED: LIVE === 'true',
    API_URL: 'http://localhost:5080',
    AUTH_URL: 'http://localhost:5050',
    LOGGING: {
      ACTION_LOG_LEVEL: LoggerLevel.DEBUG,
      API_LOG_LEVEL: LoggerLevel.DEBUG,
      DISPATCHER_LOG_LEVEL: LoggerLevel.DEBUG,
      GENERAL_LOG_LEVEL: LoggerLevel.DEBUG,
      REACT_LOG_LEVEL: LoggerLevel.DEBUG,
      USE_ASSERTIONS: true
    },
    PERSIST_ACCESS_TOKENS: true,
    REFRESH_TOKEN_INTERVAL: 10
  };
}
else {
  throw `Environment type ${ENVIRONMENT} Not implemented`;
}

config = Object.freeze(config);
export {config};

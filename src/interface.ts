// General / Global Constants
import {LoggerLevel} from 'articulog';

export enum WebSocketConnectionState {
  SLOW = 'SLOW',
  RECONNECTING = 'RECONNECTING',
  DISCONNECTED = 'DISCONNECTED',
  ERROR = 'ERROR',
  CONNECTED = 'CONNECTED'
}

export enum EnvironmentType {
  development = 'development',
  production = 'production'
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

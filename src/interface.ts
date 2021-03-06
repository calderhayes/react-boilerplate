// General / Global Constants
import {LoggerLevel} from 'articulog';

export enum WebSocketConnectionState {
  SLOW = 'SLOW',
  RECONNECTING = 'RECONNECTING',
  // RECONNECTED = 'RECONNECTED',
  DISCONNECTED = 'DISCONNECTED',
  ERROR = 'ERROR',
  CONNECTED = 'CONNECTED'
}

export enum EnvironmentType {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production'
}

export interface IConfig {
  ENVIRONMENT: EnvironmentType;
  API_LIVE_ENABLED: boolean;
  WS_LIVE_ENABLED: boolean;
  API_URL: string;
  AUTH_URL: string;
  PERSIST_ACCESS_TOKENS: boolean;
  REFRESH_TOKEN_INTERVAL: number;
  LOGGING: {
    ACTION_LOG_LEVEL: LoggerLevel;
    USE_ASSERTIONS: boolean;
    GENERAL_LOG_LEVEL: LoggerLevel;
    API_LOG_LEVEL: LoggerLevel;
    DISPATCHER_LOG_LEVEL: LoggerLevel;
    REACT_LOG_LEVEL: LoggerLevel;
  };
}

export interface IHistory {
  push(path: string, state?: any): void;
}

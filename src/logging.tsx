import {ILogger, LoggerLevel, ConsoleLoggerFactory} from 'articulog';
import {Config} from './config';

export interface ILogger {

  trace: (...args: Array<any>) => void;
  debug: (...args: Array<any>) => void;
  info: (...args: Array<any>) => void;
  warn: (...args: Array<any>) => void;
  error: (...args: Array<any>) => void;

}

export const assert = (value: any, message?: string, ...optionalParams: Array<any>) => {

  if (Config.USE_ASSERTIONS) {
    console.assert(value, message, ...optionalParams);
  }

};

// Simple log prefixing factory
const addLogPrefix = (logger: ILogger, prefix?: string) => {

  const log: ILogger = logger as any;

  const p = (prefix) ? `|${prefix}` : '';
  const methodFactory =
    (rawMethod: (...msg : Array<any>) => void, methodName: string, _: LoggerLevel, loggerName: string) => {

    return (...msg: Array<any>) => {
      rawMethod(`[${loggerName}|${methodName.toUpperCase()}${p}]`, ...msg);
    };

  };

  log.setMethodFactory(methodFactory);

  return log;

};

export const getReactLog = (componentName: string) => {

  const reactLog = ConsoleLoggerFactory.createLog({
    name: 'React|' + componentName,
    loggerLevel: Config.REACT_LOG_LEVEL
  });

  return addLogPrefix(reactLog, 'React|' + componentName);
};


// For when a logger is not provided
export const NullLogger: ILogger = ConsoleLoggerFactory.createLog({
  name: 'NullLogger',
  loggerLevel: LoggerLevel.SILENT
});

export const Log: ILogger = ConsoleLoggerFactory.createLog({
  name: 'GeneralLogger',
  loggerLevel: Config.GENERAL_LOG_LEVEL
});
addLogPrefix(Log, 'General');

export const ApiLog: ILogger = ConsoleLoggerFactory.createLog({
  name: 'Api',
  loggerLevel: Config.API_LOG_LEVEL
});
addLogPrefix(ApiLog, 'Api');

export const DispatcherLog: ILogger = ConsoleLoggerFactory.createLog({
  name: 'Dispatcher',
  loggerLevel: Config.DISPATCHER_LOG_LEVEL
});
addLogPrefix(Log, 'Dispatcher');

export const ActionLog: ILogger = ConsoleLoggerFactory.createLog({
  name: 'Action',
  loggerLevel: Config.ACTION_LOG_LEVEL
});
addLogPrefix(Log, 'Action');

// create other logs as needed

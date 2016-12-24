import * as logging from 'loglevel';
import {Config} from './config';

export interface ILogger {

  trace: (...args: Array<any>) => void;
  debug: (...args: Array<any>) => void;
  info: (...args: Array<any>) => void;
  warn: (...args: Array<any>) => void;
  error: (...args: Array<any>) => void;

}

const assert = (value: any, message?: string, ...optionalParams: Array<any>) => {

  if (Config.USE_ASSERTIONS) {
    console.assert(value, message, ...optionalParams);
  }

};

// Simple log prefixing factory
export const addLogPrefix = (logger: ILogger, prefix?: string) => {

  const log: Log = logger as any;
  const original = log.methodFactory;

  const p = (prefix) ? `|${prefix}` : '';
  log.methodFactory = (methodName: string, level: LogLevel, loggerName: string) => {

    const rawMethod = original(methodName, level, loggerName);
    return (...msg: Array<any>) => {
      rawMethod(`[${loggerName}|${methodName.toUpperCase()}${p}]`, ...msg);
    };

  };

  return log;

};

export const getReactLog = (componentName: string) => {

  assert(!!componentName, 'A component name must be provided');
  assert(typeof componentName === 'string', 'The component must be of type string');

  const reactLog: ILogger = addLogPrefix(logging.getLogger('ReactLog|' + componentName));
  (reactLog as Log).setLevel(Config.REACT_LOG_LEVEL);

  return reactLog;
};


// For when a logger is not provided
const NullLogger: ILogger = logging.getLogger('NullLogger');
(NullLogger as any).setLevel(LogLevel.SILENT);

const Log: ILogger = addLogPrefix(logging.getLogger('GeneralLog'));
(Log as Log).setLevel(Config.GENERAL_LOG_LEVEL);

const ApiLog: ILogger = addLogPrefix(logging.getLogger('ApiLog'));
(ApiLog as Log).setLevel(Config.API_LOG_LEVEL);

const DispatcherLog: ILogger = addLogPrefix(logging.getLogger('DispatcherLog'));
(DispatcherLog as Log).setLevel(Config.DISPATCHER_LOG_LEVEL);

const ActionLog: ILogger = addLogPrefix(logging.getLogger('ActionLog'));
(ActionLog as Log).setLevel(Config.ACTION_LOG_LEVEL);

// create other logs as needed

export {
  NullLogger,
  Log,
  ApiLog,
  assert,
  DispatcherLog,
  ActionLog
};

import {ILogger, LoggerLevel, ILoggerOptions, ConsoleLoggerFactory, ILoggerFactory} from 'articulog';
import {config} from './config';

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

export const namedConsoleLoggerFactory: ILoggerFactory = {
  loggerTypeId: ConsoleLoggerFactory.loggerTypeId,
  createLog: (options: ILoggerOptions) => {
    const log = ConsoleLoggerFactory.createLog(options);
    addLogPrefix(log);
    return log;
  }
};

const Log: ILogger = ConsoleLoggerFactory.createLog({
  name: 'GeneralLogger',
  loggerLevel: config.GENERAL_LOG_LEVEL
});
addLogPrefix(Log, 'General');

export {Log};

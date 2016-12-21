import * as logging from 'loglevel';
import {Config} from './config';

export interface ILogger {

  trace: (...args: any[]) => void;
  debug: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;

}

// For when a logger is not provided
const NullLogger: ILogger = logging.getLogger('NullLogger');
(NullLogger as any).setLevel(LogLevel.SILENT);

const Log: ILogger = logging.getLogger('GeneralLog');
(Log as any).setLevel(Config.GENERAL_LOG_LEVEL);

// create other logs as needed

export {
  NullLogger,
  Log
};

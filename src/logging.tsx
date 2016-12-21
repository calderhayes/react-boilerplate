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
(Log as Log).setLevel(Config.GENERAL_LOG_LEVEL);

const ApiLog: ILogger = logging.getLogger('ApiLog');
(ApiLog as Log).setLevel(Config.API_LOG_LEVEL);

// create other logs as needed

const assert = (value: any, message?: string, ...optionalParams: any[]) => {

  if (Config.USE_ASSERTIONS) {
    console.assert(value, message, ...optionalParams);
  }

};

export {
  NullLogger,
  Log,
  ApiLog,
  assert
};

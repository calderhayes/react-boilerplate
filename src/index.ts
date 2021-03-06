

import 'reflect-metadata';
import 'view/style/bootstrap/css/bootstrap.min.css';

import {Log} from 'util/logger-factory';
import {config} from 'config';
import {iocContainer} from 'ioc';
import {IOC_TYPE} from 'ioc/ioc-type';
import {bootstrapReact} from 'view/router';
import {IStore} from 'flux/store';
import { EnvironmentType } from 'interface';

import {LogControl} from 'articulog';
import { IEventEmitter, makeUnknownErrorEvent } from 'flux/event';

Log.info('Bootstrapping...');
Log.info('Bootstrapping under environment: ' + config.ENVIRONMENT);

// For easy access of the log control
(window as any).LogControl = LogControl;

const store = iocContainer.get<IStore>(IOC_TYPE.STORE);
if (config.ENVIRONMENT === EnvironmentType.DEVELOPMENT) {
  (window as any).store = store;
}

// Setting a global error catcher
window.onerror = (message, file, line, column, errorObject) => {
  column = column || (window.event && (window.event as any).errorCharacter);
  const stack = errorObject ? errorObject.stack : null;

  const data: any = {
    message,
    file,
    line,
    column,
    errorStack: stack
  };

  Log.error('Uncaught error occurred', data);

  const eventEmitter = iocContainer.get<IEventEmitter>(IOC_TYPE.EVENT_EMITTER);
  const event = makeUnknownErrorEvent(data);
  eventEmitter.emit(event);

  return false;
};

const rootHTMLElement = document.getElementById('app');
bootstrapReact(rootHTMLElement);

Log.info('Bootstrapping complete');

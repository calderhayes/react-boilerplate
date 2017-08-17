

import 'reflect-metadata';

import {Log} from 'util/logger-factory';
import {config} from 'config';
import {iocContainer} from 'ioc';
import {IOC_TYPE} from 'ioc/ioc-type';
import {bootstrapReact} from 'view/router';
import {IStore} from 'flux/store';
import { EnvironmentType } from 'interface';

import {LogControl} from 'articulog';

Log.info('Bootstrapping...');
Log.info('Bootstrapping under environment: ' + config.ENVIRONMENT);

// TODO: Split up UI into Smart (stateful components / Containers) and Dumb (functional components / Presentation)
// Refresh tokens
// Documentation
// Translate remaining fields

// For easy access of the log control
(window as any).LogControl = LogControl;

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

  return false;
};

const store = iocContainer.get<IStore>(IOC_TYPE.STORE);
if (config.ENVIRONMENT === EnvironmentType.DEVELOPMENT) {
  (window as any).store = store;
}
// const history = iocContainer.get<IHistory>(IOC_TYPE.HISTORY);
const rootHTMLElement = document.getElementById('app');
bootstrapReact(rootHTMLElement);

Log.info('Bootstrapping complete');

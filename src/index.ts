

import 'reflect-metadata';

import {Log} from './logging';

import {config} from './config';
import {iocContainer} from './ioc';
import {IOC_TYPES} from './ioc/ioc-type';
import {bootstrapReact} from './router';
import {IStore} from './flux/store';

Log.info('Bootstrapping...');
Log.info('Bootstrapping under environment: ' + config.ENVIRONMENT);

// TODO: Split up UI into Smart (stateful components / Containers) and Dumb (functional components / Presentation)

// TODO: Solidify authentication strategy
// TODO: Solidify what actions are doing vs reducers in terms of error handling
// TODO: Solidify error message handling, what provides the keys, what creates the keys (this may just be documentation)
// TODO: Create an automated front end task handler (refresh token), have a centralized
//   control that handles this in a generalized way
// TODO: Take a look at tsfmt


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

  // here I make a call to the server to log the error

  // the error can still be triggered as usual, we just wanted to know what's happening on the client side
  return false;
};

const store = iocContainer.get<IStore>(IOC_TYPES.STORE);
const rootHTMLElement = document.getElementById('app');
bootstrapReact(rootHTMLElement, store);

Log.info('Bootstrapping complete');

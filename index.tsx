

import 'reflect-metadata';

import {Container} from 'inversify';

import {Log} from './src/logging';
import {AppRouter} from './src/router';
import {initializeTranslationData} from './src/util/i18n';
import {config} from './src/config';
import {bootstrapContainer, IOC_TYPES} from './src/ioc-container';
import {IAppState, IStore} from './src/flux/store';
import {Models} from './src/api';

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

let iocContainer: Container = null;

// Here we can initialize our data etc
// tslint:disable-next-line:only-arrow-functions
async function bootstrap() {
  // TODO: Dynamically get locale
  const locale = 'en-CA';

  // TODO: Get this into container!
  const translationFunction = await initializeTranslationData(locale);

  const defaultState: IAppState = {
    exampleValue: 1,
    features: new Array<Models.IFeature>(),
    authInfo: null
  };

  iocContainer = await bootstrapContainer(translationFunction, defaultState);

  const appRouter = new AppRouter(iocContainer.get<IStore>(IOC_TYPES.STORE));
  appRouter.render(document.getElementById('app'));

  return iocContainer;
};

bootstrap();

// Should be safe, as nothing happens until this is done
// If that changes... then beware of this
export {iocContainer};

Log.info('Bootstrapping complete');

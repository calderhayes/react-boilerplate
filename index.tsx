
import {EventEmitter} from './src/flux/event-emitter';
import {Dispatcher} from './src/flux/dispatcher';
import {reducer} from './src/flux/reducer';
import {Store} from './src/flux/store';
import {DIControl} from './src/di';
import {ActionControl} from './src/flux/actions';
import {Config} from './src/config';
import {IAPIService} from './src/api/service';
import {APIServiceFactory} from './src/api';
import {Log, ApiLog} from './src/logging';
import {AppRouter} from './src/router';
import {initialize} from './src/util/i18n';

Log.info('Bootstrapping...');
Log.info('Bootstrapping under environment: ' + Config.ENVIRONMENT);

// TODO: Solidify error message handling, what provides the keys, what creates the keys (this may just be documentation)
// TODO: Create an automated front end task handler (refresh token), have a centralized
//   control that handles this in a generalized way

const API: IAPIService = APIServiceFactory.Create(ApiLog);

// Or eventually initial state
const AppStore = new Store();
const AppDispatcher = new Dispatcher();
const AppEmitter = new EventEmitter();

AppDispatcher.register((actionType: string, payload: any) => {

  const newState = reducer(AppStore.getMutableState(), actionType, payload);

  AppStore.updateState(newState);

});

const AppActions = new ActionControl(AppDispatcher, API, AppEmitter, AppStore);

// Allows for some level of dependency injection
DIControl.setEventEmitter(AppEmitter);
DIControl.setStore(AppStore);
DIControl.setDispatcher(AppDispatcher);
DIControl.setActionControl(AppActions);

// Here we can initialize our data etc
Promise.resolve()
.then(() => {
  return initialize('en-CA');
})
.then((translationMethod) => {
  DIControl.setTranslationFunction(translationMethod);
  AppRouter.render(document.getElementById('app'));
});

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

Log.info('Bootstrapping complete');

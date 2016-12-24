
// Requires React to be loaded despite not being used directly
/* tslint:disable-next-line:no-unused-variable */
import {EventEmitter} from './src/flux/event-emitter';
import {Dispatcher} from './src/flux/dispatcher';
import {reducer} from './src/flux/reducer';
import {Store} from './src/flux/store';
import {DIControl} from './src/di';
import {ActionControl} from './src/flux/actions';
import {Config, EnvironmentType} from './src/config';
import {IAPIService} from './src/api/service';
import {LocalAPIService} from './src/api/local-api-service';
import {Log, ApiLog} from './src/logging';
import {AppRouter} from './src/router';
import {Promise} from 'ts-promise';


Log.info('Bootstrapping...');


// TODO:
// TRANSLATION
// FORM VALIDATION
// CSS


let api: IAPIService = null;
if (Config.ENVIRONMENT === EnvironmentType.LOCAL) {
  api = new LocalAPIService(ApiLog);
}
else {
  throw 'Not yet implemented';
}

const API = api;


// Or eventually initial state
const AppStore = new Store();
const AppDispatcher = new Dispatcher();
const AppEmitter = new EventEmitter();

AppDispatcher.register((actionType: string, payload: any) => {

  const newState = reducer(AppStore.getMutableState(), actionType, payload);

  AppStore.updateState(newState);

});

// const API
const AppActions = new ActionControl(AppDispatcher, API, AppEmitter, AppStore);

// Allows for some level of dependency injection
DIControl.setEventEmitter(AppEmitter);
DIControl.setStore(AppStore);
DIControl.setDispatcher(AppDispatcher);
DIControl.setActionControl(AppActions);

// Here we can initialize our data etc
new Promise((resolve) => {
  Log.warn('test code');
  setTimeout(resolve, 1);
})
// Promise.resolve()
  .then(() => {
    AppRouter.render(document.getElementById('app'));
  });


Log.info('Bootstrapping complete');

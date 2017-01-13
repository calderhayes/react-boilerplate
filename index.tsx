
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
import {initialize} from './src/util/i18n';


Log.info('Bootstrapping...');

// TODO: Split up UI into Smart (stateful components / Containers) and Dumb (functional components / Presentation)

// TODO: Solidify authentication strategy
// TODO: Solidify what actions are doing vs reducers in terms of error handling
// TODO: Solidify error message handling, what provides the keys, what creates the keys (this may just be documentation)
// TODO: Create an automated front end task handler (refresh token), have a centralized 
//   control that handles this in a generalized way
// TODO: Take a look at tsfmt


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
Promise.resolve()
.then(() => {
  return initialize('en-CA');
})
.then((translationMethod) => {
  DIControl.setTranslationFunction(translationMethod);
  AppRouter.render(document.getElementById('app'));
});


Log.info('Bootstrapping complete');

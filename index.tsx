
// Requires React to be loaded despite not being used directly
/* tslint:disable-next-line:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as _ from 'lodash';
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


Log.info('Bootstrapping...');


// TODO:
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

  const retVal = reducer(AppStore.getMutableState(), actionType, payload);

  AppStore.updateState(retVal.state);

  _.each(retVal.eventData, (ev) => {
    AppEmitter.emit(ev.type, ev.parameters);
  });

});

// const API
const AppActions = new ActionControl(AppDispatcher, API);

// Allows for some level of dependency injection
DIControl.setEventEmitter(AppEmitter);
DIControl.setStore(AppStore);
DIControl.setDispatcher(AppDispatcher);
DIControl.setActionControl(AppActions);


// move this out
import {App} from './src/components/app';
class MyReactDOM {
  public static render(rootDOMElement: HTMLElement) {

    ReactDOM.render((
      <div>
        <App />
      </div>),
      rootDOMElement
    );
  }
}

MyReactDOM.render(document.getElementById('app'));

Log.info('Bootstrapping complete');

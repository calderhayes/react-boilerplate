
// Requires React to be loaded despite not being used directly
/* tslint:disable-next-line:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as _ from 'lodash';
import {App} from './src/components/app';
import {EventEmitter} from './src/flux/event-emitter';
import {Dispatcher} from './src/flux/dispatcher';
import {reducer} from './src/flux/reducer';
import {Store} from './src/flux/store';
import {StateControl} from './src/flux/control';



// Or eventually initial state
const AppStore = new Store();
const AppDispatcher = new Dispatcher();
const AppEmitter = new EventEmitter();


AppDispatcher.register((actionType: string, payload: any) => {

  // TODO: reducer(Immutable(Store), payoad);
  let retVal = reducer(AppStore.getState(), actionType, payload);

  AppStore.updateState(retVal.state);

  _.each(retVal.eventData, ev => {
    AppEmitter.emit(ev.type, ev.parameters);
  });

});

// Allows for some level of dependency injection
StateControl.setEventEmitter(AppEmitter);
StateControl.setStore(AppStore);
StateControl.setDispatcher(AppDispatcher);

class MyReactDOM {
  static render(rootDOMElement: HTMLElement) {

    ReactDOM.render((
      <div>
        <App />
      </div>),
      rootDOMElement
    );
  }
}

MyReactDOM.render(document.getElementById('app'));

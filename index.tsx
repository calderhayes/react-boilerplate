
// Requires React to be loaded despite not being used directly
/* tslint:disable-next-line:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as _ from 'lodash';
import {App} from './src/components/app';
import {AppEmitter} from './src/flux/event-emitter';
import {AppDispatcher} from './src/flux/dispatcher';
import {reducer} from './src/flux/reducer';
import {AppStore} from './src/flux/store';



AppDispatcher.register((actionType: string, payload: any) => {

  // TODO: reducer(Immutable(Store), payoad);
  let retVal = reducer(AppStore.getState(), actionType, payload);

  AppStore.updateState(retVal.state);

  _.each(retVal.eventData, ev => {
    AppEmitter.emit(ev.type, ev.parameters);
  });

});



class MyReactDOM {
  static render(rootDOMElement: any) {

    ReactDOM.render((
      <div>
        <App />
      </div>),
      document.getElementById('app')
    );
  }
}

MyReactDOM.render(document.getElementById('app'));


// Requires React to be loaded despite not being used directly
/* tslint:disable-next-line:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from './src/components/app';

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

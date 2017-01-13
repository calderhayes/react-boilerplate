
import * as React from 'react';

// react-router definition file is erroneous
// https://github.com/Microsoft/TypeScript/issues/9488
/*import {
  Router,
  Route,
  browserHistory,
  IndexRoute,
  RouterState,
  RedirectFunction
} from 'react-router';*/

// tslint:disable-next-line:no-var-requires no-require-imports
const {
  Router,
  Route,
  browserHistory,
  IndexRoute
// tslint:disable-next-line:no-var-requires no-require-imports
} = require('react-router');

import {render} from 'react-dom';
import {DIControl} from './di';
import {Log} from './logging';

import {App} from './view/routes/app';
import {Login} from './view/routes/login';
import {About} from './view/routes/about';
import {Example} from './view/routes/example';
import {Contact} from './view/routes/contact';
import {Dashboard} from './view/routes/dashboard';

// Stubbing the type, had some issues referencing History
export interface IHistory {
  push(path: string): void;
}

export const authenticate = (
  nextState: any /*RouterState*/,
  replace: any /*RedirectFunction*/) => {

  if (!DIControl.store.isLoggedIn) {
    Log.info('User is not logged in, redirecting');
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }

};

export class AppRouter {

  public static render(roomDOMElement: HTMLElement) {

    render(
      (
        <Router history={browserHistory}>
          <Route path='/' component={App}>
            <IndexRoute component={Login} />
            <Route path='login' component={Login} />
            <Route path='about' component={About} />
            <Route path='contact' component={Contact} />
            <Route path='example' component={Example} />
            <Route
              path='dashboard'
              component={Dashboard}
              onEnter={authenticate}
            />
          </Route>
        </Router>
      ), roomDOMElement);

  }

}

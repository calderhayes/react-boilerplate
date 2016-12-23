
import * as React from 'react';
import {
  Router,
  Route,
  hashHistory,
  RouterState,
  RedirectFunction
} from 'react-router';
import {render} from 'react-dom';

import {App} from './components/app';


export const authenticate = (
  nextState: RouterState,
  replace: RedirectFunction) => {

  /*if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }*/

};

export class AppRouter {

  public static render(roomDOMElement: HTMLElement) {

    render(
      (
        <Router history={hashHistory}>
          <Route path='/' component={App}>

          </Route>
        </Router>
      ), roomDOMElement);

  }

}

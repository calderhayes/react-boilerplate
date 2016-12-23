
import * as React from 'react';
import {
  Router,
  Route,
  hashHistory,
  IndexRoute
} from 'react-router';
import {render} from 'react-dom';

import {App} from './view/routes/app';
import {Login} from './view/routes/login';
import {About} from './view/routes/about';
import {Example} from './view/routes/example';
import {Contact} from './view/routes/contact';

/*export const authenticate = (
  nextState: RouterState,
  replace: RedirectFunction) => {

  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }

};*/

export class AppRouter {

  public static render(roomDOMElement: HTMLElement) {

    render(
      (
        <Router history={hashHistory}>
          <Route path='/' component={App}>
            <IndexRoute component={Login} />
            <Route path='login' component={Login} />
            <Route path='about' component={About} />
            <Route path='contact' component={Contact} />
            <Route path='example' component={Example} />
          </Route>
        </Router>
      ), roomDOMElement);

  }

}

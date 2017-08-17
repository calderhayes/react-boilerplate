import * as React from 'react';

import {
  Router,
  Route,
  IndexRoute,
  RouterState,
  RedirectFunction
} from 'react-router';

import {render} from 'react-dom';

import {Log} from 'util/logger-factory';

import {AppRoot} from 'view/routes/app-root';
import {Login} from 'view/routes/login';
import {About} from 'view/routes/about';
import {Example} from 'view/routes/example';
import {Contact} from 'view/routes/contact';
import {Dashboard} from 'view/routes/dashboard';

import {IStore} from 'flux/store';
import {StateHelpers} from 'data';
import {IHistory} from 'interface';

export const bootstrapReact = (rootHTMLElement: HTMLElement, store: IStore, history: IHistory) => {
  const appRouter = new AppRouter(store);
  appRouter.render(rootHTMLElement, history);
};

class AppRouter {

  private store: IStore;

  constructor(store: IStore) {
    this.store = store;
  }

  public render(roomDOMElement: HTMLElement, history: IHistory) {
    render(
      (
        <Router history={history as any}>
          <Route path='/' component={AppRoot}>
            <IndexRoute component={Login} onEnter={this.loginScreenAuthenticationCheck} />
            <Route path='login' component={Login} />
            <Route path='about' component={About} />
            <Route path='contact' component={Contact} />
            <Route path='example' component={Example} />
            <Route
              path='dashboard'
              component={Dashboard}
              onEnter={this.isCurrentUserAuthenticated}
            />
          </Route>
        </Router>
      ), roomDOMElement);
  }

  private loginScreenAuthenticationCheck = (nextState: RouterState, replace: RedirectFunction) => {
    if (StateHelpers.isLoggedIn(this.store.state)) {
      Log.info('User is logged in, redirecting to the dashboard');
      replace({
        pathname: '/dashboard',
        state: { nextPathname: nextState.location.pathname }
      });
    }
  }

  private isCurrentUserAuthenticated = (nextState: RouterState, replace: RedirectFunction) => {
    if (!StateHelpers.isLoggedIn(this.store.state)) {
      Log.info('User is not logged in, redirecting');
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
  }
}

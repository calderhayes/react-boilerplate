import * as React from 'react';

import {
  Router,
  Route,
  browserHistory,
  IndexRoute,
  RouterState,
  RedirectFunction
} from 'react-router';

import {render} from 'react-dom';

import {Log} from 'util/logging';

import {App} from 'view/routes/app';
import {Login} from 'view/routes/login';
import {About} from 'view/routes/about';
import {Example} from 'view/routes/example';
import {Contact} from 'view/routes/contact';
import {Dashboard} from 'view/routes/dashboard';

import {IStore, StoreHelpers} from 'flux/store';

// Stubbing the type, had some issues referencing History
export interface IHistory {
  push(path: string): void;
}

export const bootstrapReact = (rootHTMLElement: HTMLElement, store: IStore) => {
  const appRouter = new AppRouter(store);
  appRouter.render(rootHTMLElement);
};

class AppRouter {

  private store: IStore;

  constructor(store: IStore) {
    this.store = store;
  }

  public render(roomDOMElement: HTMLElement) {

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
              onEnter={this.isCurrentUserAuthenticated}
            />
          </Route>
        </Router>
      ), roomDOMElement);

  }

  public isCurrentUserAuthenticated = (nextState: RouterState, replace: RedirectFunction) => {
    if (!StoreHelpers.isLoggedIn(this.store.state)) {
      Log.info('User is not logged in, redirecting');
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
  }
}

import * as React from 'react';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import {render} from 'react-dom';

// import {Log} from 'util/logger-factory';

import {AppRoot} from 'view/routes/app-root';

// import {render} from 'react-dom';

// import {IStore} from 'flux/store';
// import {StateHelpers} from 'data';
// import {IHistory} from 'interface';

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <Router forceRefresh={false} >
        <Route path='/' component={AppRoot} />
      </Router>);
  }
}

/*class AppRouter {

  private store: IStore;

  constructor(store: IStore) {
    this.store = store;
  }

  public render(roomDOMElement: HTMLElement, history: IHistory) {
    render(
      (

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
*/

export const bootstrapReact = (rootHTMLElement: HTMLElement) => {
  render(<App />, rootHTMLElement);
};

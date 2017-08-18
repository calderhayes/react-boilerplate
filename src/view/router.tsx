import * as React from 'react';
import {BaseContainer} from 'view/containers/base-container';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import {render} from 'react-dom';
import {AppRoot} from 'view/routes/app-root';

class App extends BaseContainer<{}, {}> {
  public render() {
    return (
      <div>
        <Router>
          <Route path='/' component={AppRoot} />
        </Router>
      </div>
      );
  }
}

export const bootstrapReact = (rootHTMLElement: HTMLElement) => {
  render(<App />, rootHTMLElement);
};

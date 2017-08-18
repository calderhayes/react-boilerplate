import * as React from 'react';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import {render} from 'react-dom';

import {AppRoot} from 'view/routes/app-root';

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <Router>
        <Route path='/' component={AppRoot} />
      </Router>);
  }
}

export const bootstrapReact = (rootHTMLElement: HTMLElement) => {
  render(<App />, rootHTMLElement);
};


import * as React from 'react';
import {NavBar} from 'view/containers/nav-bar';
import {Loader} from 'view/components/loader';
import {Alert} from 'view/containers/alert';
import {IAppState, StateHelpers} from 'data';
import {BaseRoute} from 'view/routes/base-route';

import 'view/style/app.css';

export interface IAppRootProps {

}

export interface IAppRootState {
  isLoggedIn: boolean;
  loaded: boolean;
}

export class AppRoot extends BaseRoute<IAppRootProps, IAppRootState> {

  constructor(props: IAppRootProps) {
    super(props);
    this.logger.info('Constructing top level react component');

    this.state = {
      isLoggedIn: StateHelpers.isLoggedIn(this.store.state),
      loaded: false
    };

  }

  public componentDidMount() {
    this.actionLogic.initializerActionLogic.initializeAppRoute();
  }

  public render() {

    return (
      <Loader loaded={this.state.loaded}>
        <div>
          <NavBar />
          <Alert />
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12' style={{minHeight: '300px'}}>
                {this.props.children}
              </div>
            </div>
          </div>
          <div className='container'>
              <hr />
              <footer>
                  <div className='row'>
                      <div className='col-lg-12'>
                          <p>Copyright &copy; Your Website 2014</p>
                      </div>
                  </div>
              </footer>
          </div>

        </div>
      </Loader>);

  }

  protected updateLocalState(appState: IAppState, _: IAppRootState): IAppRootState {
    return {
      isLoggedIn: StateHelpers.isLoggedIn(appState),
      loaded: appState.initialized
    };
  }

  protected postAppStateUpdated(_: IAppState, original: IAppRootState, newState: IAppRootState) {
    if (original.isLoggedIn !== newState.isLoggedIn) {
      if (original.isLoggedIn) {
        this.history.push('/dashboard');
      }
      else {
        this.history.push('/');
      }
    }
  }
}

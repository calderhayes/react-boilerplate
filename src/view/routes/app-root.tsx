
import * as React from 'react';
import {NavBar} from 'view/containers/nav-bar';
import {Loader} from 'view/components/loader';
import {NotFound404} from 'view/components/notFound404';
import {Alert} from 'view/containers/alert';
import {IAppState} from 'data';
import {BaseRoute, IBaseRouteProps} from 'view/routes/base-route';
import {Route, Switch} from 'react-router-dom';
import {Login} from 'view/routes/login';
import {About} from 'view/routes/about';
import {Example} from 'view/routes/example';
import {Contact} from 'view/routes/contact';
import {Dashboard} from 'view/routes/dashboard';
import {EventTypeKey} from 'flux/event';

import 'view/style/app.css';

export interface IAppRootProps extends IBaseRouteProps {

}

export interface IAppRootState {
  isLoggedIn: boolean;
  loaded: boolean;
}

export class AppRoot extends BaseRoute<IAppRootProps, IAppRootState> {

  private refreshTokenInterval: any;

  constructor(props: IAppRootProps) {
    super(props);
    this.logger.info('Constructing top level react component');

    this.state = {
      isLoggedIn: this.store.isLoggedIn,
      loaded: false
    };

  }

  public componentWillMount() {
    super.componentWillMount();
    this.eventEmitter.on(EventTypeKey.UNKNOWN_ERROR, this.unknownErrorOccured);

    const millisecondsInSeconds = 1000;

    this.refreshTokenInterval = setInterval(
      () => this.refreshToken(),
      this.config.REFRESH_TOKEN_INTERVAL * millisecondsInSeconds);
  }

  public componentDidMount() {
    this.actionLogic.initializerActionLogic.initializeAppRoute();
  }

  public componentWillUnmount() {
    super.componentWillUnmount();
    this.eventEmitter.off(EventTypeKey.UNKNOWN_ERROR, this.unknownErrorOccured);

    clearInterval(this.refreshTokenInterval);
  }

  public render() {
    // TODO: clean this up, move to top level, make error and 404 components, not routes
    return (
      <Loader loaded={this.state.loaded}>
        <div>
          <NavBar />
          <Alert />
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12' style={{minHeight: '300px'}}>
                <Switch>
                  <Route exact path='/' component={Login} />
                  <Route path='/login' component={Login} />
                  <Route path='/about' component={About} />
                  <Route path='/contact' component={Contact} />
                  <Route path='/example' component={Example} />
                  <Route path='/dashboard' component={Dashboard} />
                  <Route path='*' component={NotFound404} />
                </Switch>
              </div>
            </div>
          </div>
          <div className='container'>
              <hr />
              <footer>
                  <div className='row'>
                      <div className='col-lg-12'>
                          <p>Copyright &copy; Your Website 2017</p>
                      </div>
                  </div>
              </footer>
          </div>
        </div>
      </Loader>);
  }

  protected updateLocalState(appState: IAppState, _: IAppRootState): IAppRootState {
    return {
      ...this.state,
      isLoggedIn: this.store.isLoggedIn,
      loaded: appState.initialized
    };
  }

  protected postAppStateUpdated(_: IAppState, original: IAppRootState, newState: IAppRootState) {
    if (original.isLoggedIn !== newState.isLoggedIn) {
      if (!original.isLoggedIn) {
        this.logger.info('Logged in, moving to dashboard');
        this.history.push('/dashboard');
      }
      else {
        this.logger.info('Logged out, moving to root');
        this.history.push('/login');
      }
    }
  }

  private unknownErrorOccured = () => {
    this.logger.error('An unknown error occured, redirecting');
    this.setState({
      ...this.state,
      loaded: true
    });
    this.alert.error({
      message: 'An unknown error has occured!'
    });
  }

  private refreshToken = () => {
    if (this.store.isLoggedIn) {
      this.logger.info('Refreshing...');
      this.actionLogic.authActionLogic.refresh();
    }
  }
}

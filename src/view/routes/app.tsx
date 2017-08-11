
import * as React from 'react';
import {BaseComponent} from 'view/base-component';
import {NavBar} from 'view/components/nav-bar';
import {Loader} from 'view/components/loader';
import {EventTypeKey} from 'flux/event';

import 'view/style/app.css';

export interface IAppProps {

}

export interface IAppState {
  loaded: boolean;
}

export class App extends BaseComponent<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);
    this.logger.info('Constructing top level react component');

    this.state = {
      loaded: false
    };

  }

  public componentDidMount() {
    this.eventEmitter.on(EventTypeKey.APP_ROUTE_INITIALIZED, this.initializationComplete);
    this.eventEmitter.on(EventTypeKey.UNKNOWN_ERROR, this.unknownError);
    this.actionLogic.initializerActionLogic.initializeAppRoute();
  }

  public componentWillUnmount() {
    this.eventEmitter.off(EventTypeKey.APP_ROUTE_INITIALIZED, this.initializationComplete);
    this.eventEmitter.off(EventTypeKey.UNKNOWN_ERROR, this.unknownError);
  }

  public render() {

    return (
      <Loader loaded={this.state.loaded}>
        <div>
          <NavBar />
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

  private initializationComplete = () => {
    this.logger.info('App route initialized');
    this.setState({
      ...this.state,
      loaded: true
    });
  }

  private unknownError = (error: any) => {
    this.logger.error('Unknown error occured', error);
    // Do something visual
  }

}

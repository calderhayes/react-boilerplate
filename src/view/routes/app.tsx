
import * as React from 'react';
import {BaseComponent} from '../base-component';
import {NavBar} from '../components/nav-bar';
import {Loader} from '../components/loader';

import 'es6-shim';
import '../style/app.css';

export interface IAppProps {

}

export interface IAppState {
  loaded: boolean;
}

export class App extends BaseComponent<IAppProps, IAppState> {

  private initializationComplete = (() => {
    this.log.info('App route initialized');
    this.state.loaded = true;
    this.setState(this.state);
  }).bind(this);

  constructor(props: IAppProps) {
    super(props);
    this.log.info('Constructing top level react component');

    this.state = {
      loaded: false
    };

  }

  public componentDidMount() {
    this.eventEmitter.on(this.actions.CONSTANTS.APP_ROUTE_INITIALIZED, this.initializationComplete);
    this.actions.initializeAppRoute();
  }

  public componentWillUnmount() {
    this.eventEmitter.off(this.actions.CONSTANTS.APP_ROUTE_INITIALIZED, this.initializationComplete);
  }

  public render() {

    return (
      <div>
        <NavBar />
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12' style={{minHeight: '300px'}}>
              <Loader loaded={this.state.loaded}>
                {this.props.children}
              </Loader>
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

      </div>);

  }

}

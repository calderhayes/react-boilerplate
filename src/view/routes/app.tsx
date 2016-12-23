
import * as React from 'react';
import {BaseComponent} from '../base-component';
import {NavBar} from '../components/nav-bar';

import '../style/app.css';

export interface IAppProps {

}

export interface IAppState {
  value: number;
}

export class App extends BaseComponent<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);
    this.log.info('Constructing to level react component');
  }

  public render() {

    return (
      <div>
        <NavBar />
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12'>
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

      </div>);

  }

}

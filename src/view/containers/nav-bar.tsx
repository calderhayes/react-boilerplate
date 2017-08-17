
import * as React from 'react';
import {BaseContainer} from 'view/containers/base-container';
import { Link } from 'react-router-dom';
import { StateHelpers, IAppState } from 'data';

export interface INavBarProps {

}

export interface INavBarState {
  isLoggedIn: boolean;
  webSocketConnectionState: string;
}

export class NavBar extends BaseContainer<INavBarProps, INavBarState> {

  constructor(props: INavBarProps) {
    super(props);

    this.state = {
      isLoggedIn: StateHelpers.isLoggedIn(this.store.state),
      webSocketConnectionState: this.store.state.webSocketConnectionState
    };
  }

  public render() {

    return (
      <nav
        className='navbar navbar-inverse navbar-fixed-top'
        role='navigation'>
        <div className='container'>
          <div className='navbar-header'>
            <button type='button'
            className='navbar-toggle'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
            </button>
            <Link className='navbar-brand' to='/login'>
              Home (brand here)
            </Link>
          </div>
          <div
            className='collapse navbar-collapse'
            id='bs-example-navbar-collapse-1'>

            <ul className='nav navbar-nav'>
              <li>
                <Link to='/about'>About</Link>
              </li>
              <li>
                <Link to='/example'>Example</Link>
              </li>
              <li>
                <Link to='/contact'>Contact</Link>
              </li>
              {(() => {
                if (this.state.isLoggedIn) {
                  return <li>
                    <Link to='/login' onClick={this.logoutClicked}>Logout</Link>
                  </li>;
                }
                else {
                  return null;
                }
              })()}
              <li style={{color: 'white'}}>{this.state.webSocketConnectionState}</li>
            </ul>
          </div>
        </div>
      </nav>
    );

  }

  protected updateLocalState(appState: IAppState, _: INavBarState): INavBarState {
    return {
      isLoggedIn: StateHelpers.isLoggedIn(appState),
      webSocketConnectionState: appState.webSocketConnectionState
    };
  }

  private logoutClicked = () => {
    this.actionLogic.authActionLogic.logout();
  }
}

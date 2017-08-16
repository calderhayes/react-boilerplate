
import * as React from 'react';
import {BaseComponent} from 'view/base-component';
import { Link, IndexLink } from 'react-router';
import {StateHelpers} from 'data';
import { EventTypeKey, IWebSocketConnectionStateChangedEvent } from 'flux/event';

export interface INavBarProps {

}

export interface INavBarState {
  isLoggedIn: boolean;
  webSocketConnectionState: string;
}

export class NavBar extends BaseComponent<INavBarProps, INavBarState> {

  constructor(props: INavBarProps) {
    super(props);

    this.state = {
      isLoggedIn: StateHelpers.isLoggedIn(this.store.state),
      webSocketConnectionState: this.store.state.webSocketConnectionState
    };
  }

  public componentWillMount() {
    this.eventEmitter.on(EventTypeKey.LOGIN, this.loginStatusUpdated);
    this.eventEmitter.on(EventTypeKey.LOGOUT, this.loginStatusUpdated);
    this.eventEmitter.on(EventTypeKey.WEB_SOCKET_CONNECTION_STATE_CHANGED, this.webSocketConnectionStateChanged);
  }

  public componentWillUnmount() {
    this.eventEmitter.off(EventTypeKey.LOGIN, this.loginStatusUpdated);
    this.eventEmitter.off(EventTypeKey.LOGOUT, this.loginStatusUpdated);
    this.eventEmitter.off(EventTypeKey.WEB_SOCKET_CONNECTION_STATE_CHANGED, this.webSocketConnectionStateChanged);
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
            <IndexLink className='navbar-brand' to='/'>
              Home (brand here)
            </IndexLink>
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

  private logoutClicked = () => {
    this.actionLogic.authActionLogic.logout();
  }

  private loginStatusUpdated = () => {
    this.setState({
      ...this.state,
      isLoggedIn: StateHelpers.isLoggedIn(this.store.state),
      webSocketConnectionState: this.store.state.webSocketConnectionState
    });
  }

  private webSocketConnectionStateChanged = (event: IWebSocketConnectionStateChangedEvent) => {
    this.setState({
      ...this.state,
      webSocketConnectionState: event.webSocketConnectionState
    });
  }

}

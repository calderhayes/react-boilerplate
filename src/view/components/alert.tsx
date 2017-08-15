import * as React from 'react';
import {BaseComponent} from 'view/base-component';
import {EventTypeKey, IWebSocketConnectionStateChangedEvent} from 'flux/event';
// import {alertify} from 'alertifyjs';
interface IAlertifyJS {
  alert(val: any): void;
}

const alertifyjs = require('alertifyjs') as IAlertifyJS;
require('alertifyjs/css/alertify.min.css')

export interface IAlertProps {

}

export interface IAlertState {

}

export class Alert extends BaseComponent<IAlertProps, IAlertState> {

  constructor(props: IAlertProps) {
    super(props);
    console.warn(alertifyjs);
  }

  public componentWillMount() {
    this.eventEmitter.on(EventTypeKey.WEB_SOCKET_CONNECTION_STATE_CHANGED, this.webSocketConnectionStateChanged);
  }

  public componentWillUnmount() {
    this.eventEmitter.off(EventTypeKey.WEB_SOCKET_CONNECTION_STATE_CHANGED, this.webSocketConnectionStateChanged);
  }

  public render() {
    return <div></div>;
  }

  private webSocketConnectionStateChanged = (event: IWebSocketConnectionStateChangedEvent) => {
    this.logger.debug(event.webSocketConnectionState);
    alertifyjs.alert(event.webSocketConnectionState);
  }
}

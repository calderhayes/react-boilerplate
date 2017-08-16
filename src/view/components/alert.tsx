import * as React from 'react';
import {BaseComponent} from 'view/base-component';
import {EventTypeKey, IWebSocketConnectionStateChangedEvent} from 'flux/event';
import {alert} from 'util/alert';
import {WebSocketConnectionState} from 'interface';

export interface IAlertProps {

}

export interface IAlertState {

}

export class Alert extends BaseComponent<IAlertProps, IAlertState> {

  constructor(props: IAlertProps) {
    super(props);
    alert.success({
      message: 'Hi!'
    });
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
    switch (event.webSocketConnectionState) {

      case WebSocketConnectionState.ERROR:
        alert.error({
          message: this.translate('web_socket_connection.error')
        });
        break;

      case WebSocketConnectionState.SLOW:
        alert.warning({
          message: this.translate('web_socket_connection.slow')
        });
        break;

      case WebSocketConnectionState.RECONNECTING:
        alert.warning({
          message: this.translate('web_socket_connection.reconnecting')
        });
        break;

      case WebSocketConnectionState.CONNECTED:
        alert.info({
          message: this.translate('web_socket_connection.connected')
        });
        break;

      default:
        break;
    }

  }
}

import * as React from 'react';
import {BaseContainer} from 'view/containers/base-container';
import {
  EventTypeKey,
  EventType,
  IWebSocketConnectionStateChangedEvent
} from 'flux/event';
import {WebSocketConnectionState} from 'interface';

export interface IAlertProps {

}

export interface IAlertState {

}

// General class for system messages
export class Alert extends BaseContainer<IAlertProps, IAlertState> {

  public componentWillMount() {
    this.eventEmitter.on(EventTypeKey.WEB_SOCKET_CONNECTION_STATE_CHANGED, this.handleEventAlert);
    this.eventEmitter.on(EventTypeKey.UNKNOWN_ERROR, this.handleEventAlert);
    this.eventEmitter.on(EventTypeKey.SOMEONE_SAID_HELLO, this.handleEventAlert);
  }

  public componentWillUnmount() {
    this.eventEmitter.off(EventTypeKey.WEB_SOCKET_CONNECTION_STATE_CHANGED, this.handleEventAlert);
    this.eventEmitter.off(EventTypeKey.UNKNOWN_ERROR, this.handleEventAlert);
    this.eventEmitter.off(EventTypeKey.SOMEONE_SAID_HELLO, this.handleEventAlert);
  }

  public render() {
    return <div></div>;
  }

  private handleEventAlert = (event: EventType) => {

    switch (event.type) {
      case EventTypeKey.WEB_SOCKET_CONNECTION_STATE_CHANGED:
        this.webSocketConnectionStateChanged(event);
        break;
      case EventTypeKey.UNKNOWN_ERROR:
        this.logger.error('Unknown error occured', event.error);
        this.alert.error({
          message: this.translate('unknown_error')
        });

        break;
      case EventTypeKey.SOMEONE_SAID_HELLO:
        this.alert.info({
          message: `${event.username} says hello!`
        });

        break;
      default:
        // Do nothing
        break;
    }

  }

  private webSocketConnectionStateChanged = (event: IWebSocketConnectionStateChangedEvent) => {
    this.logger.debug(event.webSocketConnectionState);
    switch (event.webSocketConnectionState) {

      case WebSocketConnectionState.ERROR:
        this.alert.error({
          message: this.translate('web_socket_connection.error')
        });
        break;

      case WebSocketConnectionState.SLOW:
        this.alert.warning({
          message: this.translate('web_socket_connection.slow')
        });
        break;

      case WebSocketConnectionState.RECONNECTING:
        this.alert.warning({
          message: this.translate('web_socket_connection.reconnecting')
        });
        break;

      case WebSocketConnectionState.CONNECTED:
        this.alert.info({
          message: this.translate('web_socket_connection.connected')
        });
        break;

      default:
        break;
    }

  }
}

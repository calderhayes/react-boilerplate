import {IWebSocketEventManager} from 'api/interface';

declare const $: any;

export class SignalREventManager implements IWebSocketEventManager {

  private tryingToReconnect: boolean = false;

  public registerErrorHandler(handler: (error: any) => any) {
    $.connection.hub.error(handler);
  }

  public registerConnectionSlowHandler(handler: () => void) {
    $.connection.hub.connectionSlow(handler);
  }

  public registerReconnectingHandler(handler: () => void) {
    this.tryingToReconnect = false;
    $.connection.hub.reconnecting(handler);
  }

  public registerReconnectedHandler(handler: () => void) {
    this.tryingToReconnect = false;
    $.connection.hub.reconnected(handler);
  }

  public registerDisconnectedHandler(handler: (lastError: any) => void) {
    if (this.tryingToReconnect) {
      $.connection.hub.disonnected(() => {
        handler($.connection.hub.lastError);
      });
    }
  }

}

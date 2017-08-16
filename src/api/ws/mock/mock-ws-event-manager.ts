import {IWebSocketEventManager} from 'api/interface';

export class MockWSEventManager implements IWebSocketEventManager {

  public registerErrorHandler(_: (error: any) => any) {
    // Do nothing
  }

  public registerConnectionSlowHandler(_: () => void) {
    // Do nothing
  }

  public registerReconnectingHandler(_: () => void) {
    // Do nothing
  }

  public registerReconnectedHandler(_: () => void) {
    // Do nothing
  }

  public registerDisconnectedHandler(_: (lastError: any) => void) {
    // Do nothing
  }

}

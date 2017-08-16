import {Models} from 'api';
import {WebSocketConnectionState} from 'interface';

export interface IAppState {
  readonly exampleValue: number;
  readonly features: Array<Models.IFeature>;
  readonly authInfo: Models.IOAuth2Token;
  readonly webSocketConnectionState: WebSocketConnectionState;
}

export const defaultState: IAppState = {
  exampleValue: 1,
  features: new Array<Models.IFeature>(),
  authInfo: null,
  webSocketConnectionState: WebSocketConnectionState.DISCONNECTED
};

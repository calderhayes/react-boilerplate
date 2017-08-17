import {ActionType, ActionTypeKey} from '../action';
import {IAppState} from 'data';
import {WebSocketConnectionState} from 'interface';
import iassign from 'immutable-assign';

iassign.setOption({
  freezeInput: false,
  freezeOutput: true,
  disableAllCheck: false,
  disableExtraStatementCheck: false,
  ignoreIfNoChange: true
});

// WE can offload smaller more testable functions from the main reducer
// const someMoreComplexFunctionOrSubReducer

export type Reducer = (state: IAppState, action: ActionType) => IAppState;

export const reducer: Reducer = (state: IAppState, action: ActionType) => {
  switch (action.type) {
    case ActionTypeKey.EXAMPLE:

      // Update the exampleValue
      const newValue = action.value;
      return iassign(state, (s) => s.exampleValue, (_) => newValue);

    case ActionTypeKey.APP_ROUTE_INITIALIZED:

      return iassign(state, (s) => s.initialized, (_) => true);

    case ActionTypeKey.LOGIN:
      // Update the tokenData
      let newLoginState = iassign(state, (s) => s.authInfo, (_) => action.tokenData);
      newLoginState = iassign(
        newLoginState,
        (s) => s.webSocketConnectionState,
        (_) => WebSocketConnectionState.CONNECTED);
      return newLoginState;

    case ActionTypeKey.LOGOUT:
      // Clear the tokenData
      let newLogoutState = iassign(state, (s) => s.authInfo, (_) => null);
      newLogoutState = iassign(
        newLogoutState,
        (s) => s.webSocketConnectionState,
        (_) => WebSocketConnectionState.DISCONNECTED);
      return newLogoutState;

    case ActionTypeKey.WEB_SOCKET_CONNECTION_STATE_CHANGED:
      // Set the new state
      return iassign(state, (s) => s.webSocketConnectionState, (_) => action.newState);

    case ActionTypeKey.OTHER_ACTION:
      // Log warning
      return state;

    default:
      return state;
  }
};

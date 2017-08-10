import {ActionType, ActionTypeKey} from '../action';
import {IAppState} from '../store';
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
      // Do nothing as of now
      return state;

    case ActionTypeKey.LOGIN:
      // Update the tokenData
      return iassign(state, (s) => s.authInfo, (_) => action.tokenData);

    case ActionTypeKey.LOGOUT:
      // Clear the tokenData
      return iassign(state, (s) => s.authInfo, (_) => null);

    case ActionTypeKey.OTHER_ACTION:
      // Log warning
      return state;

    default:
      return state;
  }
};

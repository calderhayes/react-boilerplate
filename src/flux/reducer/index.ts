import {ActionTypes, TypeKeys} from '../action';
import {IAppState} from '../store';
import iassign from 'immutable-assign';

// TODO: Split these off of the index
// TODO: Globalize?
iassign.setOption({
  freezeInput: false,
  freezeOutput: true,
  disableAllCheck: false,
  disableExtraStatementCheck: false,
  ignoreIfNoChange: true
});

// WE can offload smaller more testable functions from the main reducer
// const someMoreComplexFunctionOrSubReducer

export type Reducer = (state: IAppState, action: ActionTypes) => IAppState;

export const reducer: Reducer = (state: IAppState, action: ActionTypes) => {
  switch (action.type) {
    case TypeKeys.EXAMPLE:

      // Update the exampleValue
      const newValue = action.value;
      return iassign(state, (s) => s.exampleValue, (_) => newValue);

    case TypeKeys.APP_ROUTE_INITIALIZED:
      // Do nothing as of now
      return state;

    case TypeKeys.LOGIN:
      // Update the tokenData
      return iassign(state, (s) => s.authInfo, (_) => action.tokenData);

    case TypeKeys.LOGOUT:
      // Clear the tokenData
      return iassign(state, (s) => s.authInfo, (_) => null);

    case TypeKeys.OTHER_ACTION:
      // Log warning
      return state;

    default:
      return state;
  }
};

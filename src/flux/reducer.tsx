
import {ActionControl} from '../flux/actions';
import {IAppState} from '../flux/store';
import {Models} from '../api';

const {CONSTANTS} = ActionControl;

export interface IEventData {
  type: string;
  parameters: any;
};

const reducer = (currentState: IAppState, actionType: string, payload: any) => {

  switch (actionType) {

    case CONSTANTS.EXAMPLE:

      // Scoping brackets
      {
        const value: number = payload.value;

        currentState.exampleValue = value;

      }

      break;

    case CONSTANTS.APP_ROUTE_INITIALIZED:

      {
        // No state stuff as of yet
      }

      break;

    case CONSTANTS.LOGIN:

      {
        const result: Models.IOAuth2TokenResult = payload;
        currentState.authInfo = result;
      }

      break;

    case CONSTANTS.LOGOUT:

      {
        currentState.authInfo = null;
      }

      break;

    default:
      break;

  }

  return currentState;

};

export {reducer}

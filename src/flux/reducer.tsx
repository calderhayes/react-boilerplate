
import {ActionControl} from '../flux/actions';
import {IAppState} from '../flux/store';
import {IAPIResult, APIResultStatus} from '../api/service';
import * as Model from '../api/models';

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
        const result: IAPIResult<Model.IOauth2TokenResult> = payload;
        let success = false;

        if (result.status === APIResultStatus.SUCCESS) {
          success = true;
          currentState.authInfo = result.value;
        }
        else {
          currentState.authInfo = null;
        }

      }

      break;

    default:
      break;

  }

  return currentState;

};

export {reducer}

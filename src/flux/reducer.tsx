
import {ActionControl} from '../flux/actions';
import {IAppState} from '../flux/store';
import {IAPIResult, APIResultStatus} from '../api/service';
import * as Model from '../api/models';

const {CONSTANTS} = ActionControl;

export interface IEventData {
  type: string;
  parameters: any;
};

export interface IReducerResult {
  eventData: Array<IEventData>;
  state: IAppState;
}

const reducer = (currentState: IAppState, actionType: string, payload: any) => {

  const eventData: Array<IEventData> = new Array<IEventData>();

  switch (actionType) {

    case CONSTANTS.EXAMPLE:

      // Scoping brackets
      {
        const value: number = payload.value;

        currentState.exampleValue = value;

        eventData.push({
          parameters: {
            value
          },
          type: CONSTANTS.EXAMPLE
        });

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

        eventData.push({
          parameters: {
            success
          },
          type: CONSTANTS.LOGIN
        });

      }

      break;

    default:
      break;

  }

  const res: IReducerResult = {
    eventData,
    state: currentState
  };

  return res;

};

export {reducer}


import {ActionControl} from '../flux/actions';
import {IAppState} from '../flux/store';

const {CONSTANTS} = ActionControl;

export interface IEventData {
  type: string;
  parameters: any;
};

export interface IReducerResult {
  eventData: Array<IEventData>,
  state: IAppState
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
            value: value
          },
          type: CONSTANTS.EXAMPLE
        });

      }

      break;

    default:
      break;

  }

  const res: IReducerResult = {
    eventData: eventData,
    state: currentState
  };

  return res;

};

export {reducer}

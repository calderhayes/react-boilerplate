
import {ActionConstants} from '../flux/constants';
import {IAppState} from '../flux/store';

export interface IEventData {
  type: string;
  parameters: any;
};

export interface IReducerResult {
  eventData: IEventData[],
  state: IAppState
}

const reducer = (currentState: IAppState, actionType: string, payload: any) => {

  let eventData: IEventData[] = [];

  switch (actionType) {

    case ActionConstants.EXAMPLE:

      // Scoping brackets
      {
        let value: number = payload.value;

        currentState.exampleValue = value;

        eventData.push({
          parameters: {
            value: value
          },
          type: ActionConstants.EXAMPLE
        });

      }

      break;

    default:
      break;

  }

  let res: IReducerResult = {
    eventData: eventData,
    state: currentState
  };

  return res;

};

export {reducer}

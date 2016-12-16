
import {ActionConstants} from '../flux/constants';
import {AppStore} from '../flux/store';

export interface IEventData {
  type: string;
  parameters: any;
};

const reducer = (currentState: AppStore, actionType: string, payload: any) => {

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

  return {
    eventData: eventData,
    state: currentState
  };

};

export {reducer}

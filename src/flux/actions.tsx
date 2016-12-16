
import {ActionConstants} from '../flux/constants';
import {AppDispatcher} from '../flux/dispatcher';

export function doExample() {

  AppDispatcher.dispatch(ActionConstants.EXAMPLE, {
    value: (new Date()).getTime()
  });

  // return Promise.resolve();

}

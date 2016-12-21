
import {ActionConstants} from '../flux/constants';
import {StateControl} from '../flux/control';

export function doExample() {

  StateControl.dispatcher.dispatch(ActionConstants.EXAMPLE, {
    value: (new Date()).getTime()
  });

  return Promise.resolve();

}

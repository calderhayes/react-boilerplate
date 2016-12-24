
import {IImmutableAppState} from './store';
import * as _ from 'lodash';

// Here is where we put the implementation of
// the helper methods get manipulate the data
// We do this to force the developer to use getState()
export abstract class BaseStore {

  public abstract getState(): IImmutableAppState;

  private get _state() {
    return this.getState();
  }

  public isFeatureActivated(featureType: string): boolean {
    const f = _.find(this._state.features, (ft) => ft.featureType === featureType);
    if (f) {
      return f.isActivated;
    }

    return false;
  }

  public get isLoggedIn() {
    // This may need an expiry check
    return !!this._state.authInfo;
  }

}

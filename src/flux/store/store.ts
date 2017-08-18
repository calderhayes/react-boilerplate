import {IAppState} from 'data';
import {BaseStore} from './base-store';
import {injectable} from 'inversify';
import {find} from 'lodash';

export interface IStore extends BaseStore<IAppState> {
  isFeatureActivated(featureType: string): boolean;
  readonly isLoggedIn: boolean;
}

@injectable()
export class Store extends BaseStore<IAppState> implements IStore {

  public isFeatureActivated = (featureType: string): boolean => {
    const f = find(this.state.features, (ft) => ft.featureType === featureType);
    if (f) {
      return f.isActivated;
    }

    return false;
  };

  public get isLoggedIn() {
    return !!this.state.authInfo; // && state.authInfo.expiryDate < new Date();
  };

}

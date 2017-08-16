
import {find} from 'lodash';
import {IAppState} from 'data/app-state';

export const isFeatureActivated = (state: IAppState, featureType: string): boolean => {
  const f = find(state.features, (ft) => ft.featureType === featureType);
  if (f) {
    return f.isActivated;
  }

  return false;
};

export const isLoggedIn = (state: IAppState) => !!state.authInfo;

import {IAPIService, APIServiceFactory, Models} from './api';
import {IStore, Store, IAppState} from './flux/store';
import {Reducer, reducer} from './flux/reducer';
import {IDispatcher, Dispatcher} from './flux/dispatcher';

import { config, IConfig } from "./config";
import {Container} from 'inversify';

export const IOC_TYPES = {
  CONFIG: Symbol('CONFIG'),
  API_SERVICE: Symbol('API_SERVICE'),
  STORE: Symbol('STORE'),
  REDUCER: Symbol('REDUCER'),
  DISPATCHER: Symbol('DISPATCHER')
}

const iocContainer = new Container();

iocContainer.bind<IConfig>(IOC_TYPES.CONFIG)
  .toConstantValue(config);

iocContainer.bind<IAPIService>(IOC_TYPES.API_SERVICE)
  .toConstantValue(APIServiceFactory.create(config));

// This doesn't go here
const defaultState: IAppState = {
  exampleValue: 1,
  features: new Array<Models.IFeature>(),
  authInfo: null
};

iocContainer.bind<IStore>(IOC_TYPES.STORE)
  .toConstantValue(new Store(defaultState));

iocContainer.bind<Reducer>(IOC_TYPES.REDUCER)
  .toConstantValue(reducer);

iocContainer.bind<IDispatcher>(IOC_TYPES.DISPATCHER)
  .to(Dispatcher);

export {iocContainer};

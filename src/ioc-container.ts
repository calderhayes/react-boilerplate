import {IAPIService, APIServiceFactory, Models} from './api';
import {IStore, Store, IAppState} from './flux/store';
import {Reducer, reducer} from './flux/reducer';
import {IDispatcher, Dispatcher} from './flux/dispatcher';
import {IEventEmitter, EventEmitter} from './flux/event';
import * as Action from './flux/action';
import {TranslationFunction} from './util/i18n';

import { config, IConfig } from './config';
import {Container} from 'inversify';

export const IOC_TYPES = {
  TRANSLATION_FUNCTION: Symbol('TRANSLATION_FUNCTION'),
  CONFIG: Symbol('CONFIG'),
  API_SERVICE: Symbol('API_SERVICE'),
  STORE: Symbol('STORE'),
  REDUCER: Symbol('REDUCER'),
  DISPATCHER: Symbol('DISPATCHER'),
  EVENT_EMITTER: Symbol('EVENT_EMITTER'),
  AUTH_ACTION_LOGIC: Symbol('AUTH_ACTION_LOGIC'),
  EXAMPLE_ACTION_LOGIC: Symbol('EXAMPLE_ACTION_LOGIC'),
  INITIALIZER_ACTION_LOGIC: Symbol('INITIALIZER_ACTION_LOGIC')
};

// This doesn't go here
const defaultState: IAppState = {
  exampleValue: 1,
  features: new Array<Models.IFeature>(),
  authInfo: null
};

export const bootstrapContainer = (translationMethod: TranslationFunction, initialState?: IAppState|undefined|null) => {
  const state = initialState || defaultState;
  const iocContainer = new Container({ defaultScope: 'Singleton' });

  iocContainer.bind<TranslationFunction>(IOC_TYPES.TRANSLATION_FUNCTION)
    .toConstantValue(translationMethod);

  iocContainer.bind<IConfig>(IOC_TYPES.CONFIG)
    .toConstantValue(config);

  iocContainer.bind<IAPIService>(IOC_TYPES.API_SERVICE)
    .toConstantValue(APIServiceFactory.create(config));

  iocContainer.bind<IStore>(IOC_TYPES.STORE)
    .toConstantValue(new Store(state));

  iocContainer.bind<Reducer>(IOC_TYPES.REDUCER)
    .toConstantValue(reducer);

  iocContainer.bind<IDispatcher>(IOC_TYPES.DISPATCHER)
    .to(Dispatcher);

  iocContainer.bind<IEventEmitter>(IOC_TYPES.EVENT_EMITTER)
    .to(EventEmitter);

  iocContainer.bind<Action.IAuthActionLogic>(IOC_TYPES.AUTH_ACTION_LOGIC)
    .to(Action.AuthActionLogic);

  iocContainer.bind<Action.IInitializerActionLogic>(IOC_TYPES.INITIALIZER_ACTION_LOGIC)
    .to(Action.InitializerActionLogic);

  iocContainer.bind<Action.IExampleActionLogic>(IOC_TYPES.EXAMPLE_ACTION_LOGIC)
    .to(Action.ExampleActionLogic);

  return iocContainer;
};

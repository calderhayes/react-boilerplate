import {IAPIService, APIServiceFactory, Models} from '../api';
import {IStore, Store, IAppState} from '../flux/store';
import {Reducer, reducer} from '../flux/reducer';
import {IDispatcher, Dispatcher} from '../flux/dispatcher';
import {IEventEmitter, EventEmitter} from '../flux/event';
import {ActionLogic, IActionLogic} from '../flux/logic';
import {TranslationFunction, translationFunction} from '../util/i18n';
import {IOC_TYPES} from './ioc-type';
import getDecorators from 'inversify-inject-decorators';

import { config, IConfig } from '../config';
import {Container} from 'inversify';

// This doesn't go here
const defaultState: IAppState = {
  exampleValue: 1,
  features: new Array<Models.IFeature>(),
  authInfo: null
};

const iocContainer = new Container({ defaultScope: 'Singleton' });

iocContainer.bind<TranslationFunction>(IOC_TYPES.TRANSLATION_FUNCTION)
  .toDynamicValue(() => translationFunction);

iocContainer.bind<IConfig>(IOC_TYPES.CONFIG)
  .toConstantValue(config);

iocContainer.bind<IAPIService>(IOC_TYPES.API_SERVICE)
  .toConstantValue(APIServiceFactory.create(config));

iocContainer.bind<IStore>(IOC_TYPES.STORE)
  .toConstantValue(new Store(defaultState));

iocContainer.bind<Reducer>(IOC_TYPES.REDUCER)
  .toConstantValue(reducer);

iocContainer.bind<IDispatcher>(IOC_TYPES.DISPATCHER)
  .to(Dispatcher);

iocContainer.bind<IEventEmitter>(IOC_TYPES.EVENT_EMITTER)
  .to(EventEmitter);

/*iocContainer.bind<Action.IAuthActionLogic>(IOC_TYPES.AUTH_ACTION_LOGIC)
  .to(Action.AuthActionLogic);

iocContainer.bind<Action.IInitializerActionLogic>(IOC_TYPES.INITIALIZER_ACTION_LOGIC)
  .to(Action.InitializerActionLogic);

iocContainer.bind<Action.IExampleActionLogic>(IOC_TYPES.EXAMPLE_ACTION_LOGIC)
  .to(Action.ExampleActionLogic);*/

iocContainer.bind<IActionLogic>(IOC_TYPES.ACTION_LOGIC)
  .to(ActionLogic);

const {lazyInject} = getDecorators(iocContainer);

export {
  lazyInject,
  iocContainer
}

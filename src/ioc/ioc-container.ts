import {IAPIServiceFactory, APIServiceFactory, Models} from 'api';
import {IStore, Store, IAppState} from 'flux/store';
import {Reducer, reducer} from 'flux/reducer';
import {IDispatcher, Dispatcher} from 'flux/dispatcher';
import {IEventEmitter, EventEmitter} from 'flux/event';
import {ActionLogic, IActionLogic} from 'flux/logic';
import {TranslationFunction, translationFunction} from 'util/i18n';
import {IOC_TYPE} from 'ioc/ioc-type';
import {config, IConfig } from 'config';
import {namedConsoleLoggerFactory} from 'util/logging';

import {ILoggerFactory} from 'articulog';
import {Container} from 'inversify';
import getDecorators from 'inversify-inject-decorators';

// This doesn't go here
const defaultState: IAppState = {
  exampleValue: 1,
  features: new Array<Models.IFeature>(),
  authInfo: null
};

const iocContainer = new Container({ defaultScope: 'Singleton' });

iocContainer.bind<IConfig>(IOC_TYPE.CONFIG)
  .toConstantValue(config);

iocContainer.bind<ILoggerFactory>(IOC_TYPE.LOGGER_FACTORY)
  .toConstantValue(namedConsoleLoggerFactory);

iocContainer.bind<TranslationFunction>(IOC_TYPE.TRANSLATION_FUNCTION)
  .toDynamicValue(() => translationFunction);

iocContainer.bind<IAPIServiceFactory>(IOC_TYPE.API_SERVICE_FACTORY)
  .to(APIServiceFactory);

iocContainer.bind<IStore>(IOC_TYPE.STORE)
  .toConstantValue(new Store(defaultState));

iocContainer.bind<Reducer>(IOC_TYPE.REDUCER)
  .toConstantValue(reducer);

iocContainer.bind<IDispatcher>(IOC_TYPE.DISPATCHER)
  .to(Dispatcher);

iocContainer.bind<IEventEmitter>(IOC_TYPE.EVENT_EMITTER)
  .to(EventEmitter);

iocContainer.bind<IActionLogic>(IOC_TYPE.ACTION_LOGIC)
  .to(ActionLogic);

const {lazyInject} = getDecorators(iocContainer);

export {
  lazyInject,
  iocContainer
}

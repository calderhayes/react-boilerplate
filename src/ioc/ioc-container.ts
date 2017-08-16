import {IAPIServiceFactory, APIServiceFactory, Models} from 'api';
import {IStore, Store} from 'flux/store';
import {Reducer, reducer} from 'flux/reducer';
import {IDispatcher, Dispatcher} from 'flux/dispatcher';
import {IEventEmitter, EventEmitter} from 'flux/event';
import {ActionLogic, IActionLogic} from 'flux/logic';
import {TranslationFunction, translationFunction} from 'util/i18n';
import {IOC_TYPE} from 'ioc/ioc-type';
import {config} from 'config';
import {IConfig} from 'interface';
import {namedConsoleLoggerFactory} from 'util/logger-factory';
import {
  defaultState,
  IPersistedDataItem,
  MockedPersistedDataItem,
  LocalStoragePersistedDataItem
} from 'data';
import {IziToast, alert} from 'util/alert';

import {ILoggerFactory} from 'articulog';
import {Container} from 'inversify';
import getDecorators from 'inversify-inject-decorators';

const authDataItem: IPersistedDataItem<Models.IOAuth2Token> = config.PERSIST_ACCESS_TOKENS ?
  new LocalStoragePersistedDataItem<Models.IOAuth2Token>('accessToken')
  : new MockedPersistedDataItem<Models.IOAuth2Token>();

(defaultState as any).authInfo = authDataItem.item;

const iocContainer = new Container({ defaultScope: 'Singleton' });

iocContainer.bind<IConfig>(IOC_TYPE.CONFIG)
  .toConstantValue(config);

iocContainer.bind<IPersistedDataItem<Models.IOAuth2Token>>(IOC_TYPE.AUTH_PERSISTED_DATA_ITEM)
  .toConstantValue(authDataItem);

iocContainer.bind<IziToast>(IOC_TYPE.TOASTR)
  .toConstantValue(alert);

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

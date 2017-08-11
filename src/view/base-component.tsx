
import * as React from 'react';
import {IStore} from '../flux/store';
import {IOC_TYPE} from '../ioc';
import {IEventEmitter} from '../flux/event';
import {IActionLogic} from '../flux/logic';
import {IHistory} from '../router';
import {TranslationFunction} from 'i18next';
import {lazyInject} from '../ioc';
import {IConfig} from '../config';

// import {browserHistory} from 'react-router';
// tslint:disable-next-line:no-var-requires no-require-imports
const {browserHistory} = require('react-router');
import {ILogger, ILoggerFactory} from 'articulog';

// Handles the dependency injection
class BaseComponent<P, S> extends React.Component<P, S> {

  @lazyInject(IOC_TYPE.STORE)
  public readonly store: IStore;

  @lazyInject(IOC_TYPE.ACTION_LOGIC)
  public readonly actionLogic: IActionLogic;

  @lazyInject(IOC_TYPE.EVENT_EMITTER)
  public readonly eventEmitter: IEventEmitter;

  @lazyInject(IOC_TYPE.TRANSLATION_FUNCTION)
  public readonly translate: TranslationFunction;

  // Stubbing the type, had some issues referencing History
  public readonly history: IHistory;

  @lazyInject(IOC_TYPE.CONFIG)
  private config: IConfig;

  @lazyInject(IOC_TYPE.LOGGER_FACTORY)
  private loggerFactory: ILoggerFactory;

  private _logger: ILogger;

  constructor(props: P) {
    super(props);
    this.history = browserHistory;
  }

  protected get logger() {
    if (this._logger) {
      return this._logger;
    }

    const className = (this as any).constructor.name;
    this._logger = this.loggerFactory.createLog({
      name: 'React|' + className,
      loggerLevel: this.config.REACT_LOG_LEVEL
    });

    return this._logger;
  };

}

export {BaseComponent}


import * as React from 'react';
import {IOC_TYPE} from 'ioc/ioc-type';
import {TranslationFunction} from 'i18next';
import {lazyInject} from 'ioc';
import {IConfig} from 'interface';

import {ILogger, ILoggerFactory} from 'articulog';

// Handles the dependency injection
export class BaseComponent<P, S> extends React.Component<P, S> {

  @lazyInject(IOC_TYPE.TRANSLATION_FUNCTION)
  protected readonly translate: TranslationFunction;

  @lazyInject(IOC_TYPE.CONFIG)
  protected config: IConfig;

  @lazyInject(IOC_TYPE.LOGGER_FACTORY)
  private loggerFactory: ILoggerFactory;

  private _logger: ILogger;

  protected get logger() {
    if (this._logger) {
      return this._logger;
    }

    const className = (this as any).constructor.name;
    this._logger = this.loggerFactory.createLog({
      name: 'React|' + className,
      loggerLevel: this.config.LOGGING.REACT_LOG_LEVEL
    });

    return this._logger;
  };
}


import * as React from 'react';
import {IStore} from 'flux/store';
import {IOC_TYPE} from 'ioc/ioc-type';
import {IEventEmitter, EventTypeKey} from 'flux/event';
import {IActionLogic} from 'flux/logic';
import {IHistory} from 'view/router';
import {TranslationFunction} from 'i18next';
import {lazyInject} from 'ioc';
import {IConfig} from 'interface';
import {IziToast} from 'util/alert';

// import {browserHistory} from 'react-router';
// tslint:disable-next-line:no-var-requires no-require-imports
const {browserHistory} = require('react-router');
import {ILogger, ILoggerFactory} from 'articulog';
import { IAppState } from 'data';

// Handles the dependency injection
export class BaseContainer<P, S> extends React.Component<P, S> {

  @lazyInject(IOC_TYPE.STORE)
  protected readonly store: IStore;

  @lazyInject(IOC_TYPE.ACTION_LOGIC)
  protected readonly actionLogic: IActionLogic;

  @lazyInject(IOC_TYPE.EVENT_EMITTER)
  protected readonly eventEmitter: IEventEmitter;

  @lazyInject(IOC_TYPE.TRANSLATION_FUNCTION)
  protected readonly translate: TranslationFunction;

  @lazyInject(IOC_TYPE.TOASTR)
  protected readonly alert: IziToast;

  // Stubbing the type, had some issues referencing History
  protected readonly history: IHistory;

  @lazyInject(IOC_TYPE.CONFIG)
  protected config: IConfig;

  @lazyInject(IOC_TYPE.LOGGER_FACTORY)
  private loggerFactory: ILoggerFactory;

  private _logger: ILogger;

  constructor(props: P) {
    super(props);
    this.history = browserHistory;
  }

  public componentWillMount() {
    this.eventEmitter.on(EventTypeKey.APP_STATE_UPDATED, this._appStateUpdated);
  }

  public componentWillUnmount() {
    this.eventEmitter.off(EventTypeKey.APP_STATE_UPDATED, this._appStateUpdated);
  }

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

  protected appStateUpdated(_: IAppState, _2: S) {
    // Do nothing
  }

  protected updateLocalState(_: IAppState, localState: S): S {
    return localState;
  }

  protected postAppStateUpdated(_: IAppState, _original: S, _new: S) {
    // Do nothing
  }

  private _appStateUpdated = () => {
    const originalState = this.state;
    this.appStateUpdated(this.store.state, originalState);
    const newState = this.updateLocalState(this.store.state, this.state);
    this.setState(newState);
    this.postAppStateUpdated(this.store.state, originalState, newState);
  }
}

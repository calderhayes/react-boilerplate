
import * as React from 'react';
import {IStore} from '../flux/store';
import {IOC_TYPES} from '../ioc';
import {IEventEmitter} from '../flux/event';
import {IActionLogic} from '../flux/logic';
import {ILogger} from '../logging';
import {getReactLog} from '../logging';
// import {browserHistory} from 'react-router';
// tslint:disable-next-line:no-var-requires no-require-imports
const {browserHistory} = require('react-router');
import {IHistory} from '../router';
import {TranslationFunction} from 'i18next';
import {lazyInject} from '../ioc';

// Handles the dependency injection
class BaseComponent<P, S> extends React.Component<P, S> {

  @lazyInject(IOC_TYPES.STORE)
  public readonly store: IStore;

  @lazyInject(IOC_TYPES.ACTION_LOGIC)
  public readonly actionLogic: IActionLogic;

  @lazyInject(IOC_TYPES.EVENT_EMITTER)
  public readonly eventEmitter: IEventEmitter;

  @lazyInject(IOC_TYPES.TRANSLATION_FUNCTION)
  public readonly translate: TranslationFunction;

  // Stubbing the type, had some issues referencing History
  public readonly history: IHistory;

  protected get log() {
    if (!this._log) {
      const prefix = (this as any).constructor.name;
      this._log = getReactLog(prefix);
    }

    return this._log;
  };

  private _log: ILogger;


  constructor(props: P) {
    super(props);
    this.history = browserHistory;
  }

}

export {BaseComponent}

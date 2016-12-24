
import * as React from 'react';
import {DIControl} from '../di';
import {IStore} from '../flux/store';
import {ActionControl} from '../flux/actions';
import {IEventEmitter} from '../flux/event-emitter';
import {ILogger} from '../logging';
import {getReactLog} from '../logging';
import {browserHistory} from 'react-router';

// Handles the dependency injection
class BaseComponent<P, S> extends React.Component<P, S> {

  public readonly store: IStore;
  public readonly actions: ActionControl;
  public readonly eventEmitter: IEventEmitter;
  // Stubbing the type, had some issues referencing History
  public readonly history: {push(path: string): void};

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

    this.store = DIControl.store;
    this.actions = DIControl.actionControl;
    this.eventEmitter = DIControl.eventEmitter;
    this.history = browserHistory;
  }

}

export {BaseComponent}

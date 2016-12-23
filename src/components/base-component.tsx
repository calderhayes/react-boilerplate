
import * as React from 'react';
import {DIControl} from '../di';
import {IStore} from '../flux/store';
import {ActionControl} from '../flux/actions';
import {IEventEmitter} from '../flux/event-emitter';
import {ReactLog, ILogger} from '../logging';

class BaseComponent<P, S> extends React.Component<P, S> {

  public store: IStore;
  public actions: ActionControl;
  public eventEmitter: IEventEmitter;
  protected log: ILogger;

  constructor(props: P) {
    super(props);

    this.store = DIControl.store;
    this.actions = DIControl.actionControl;
    this.eventEmitter = DIControl.eventEmitter;
    this.log = ReactLog;
  }

}

export {BaseComponent}

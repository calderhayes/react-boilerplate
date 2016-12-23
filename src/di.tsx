
import {IEventEmitter} from './flux/event-emitter';
import {IStore} from './flux/store';
import {IDispatcher} from './flux/dispatcher';
import {ActionControl} from './flux/actions';
import {assert} from './logging';

export class DIControlClass {

  private _eventEmitter: IEventEmitter = null;
  private _store: IStore = null;
  private _dispatcher: IDispatcher = null;
  private _actionControl: ActionControl = null;

  public get eventEmitter() {
    assert(this._eventEmitter !== null,
      'Event Emitter has not been set and is being accessed!');

    return this._eventEmitter;
  }

  public get store() {
    assert(this._store !== null,
      'Store has not been set and is being accessed!');

    return this._store;
  }

  public get dispatcher() {
    assert(this._dispatcher !== null,
      'Dispatcher has not been set and is being accessed!');

    return this._dispatcher;
  }

  public get actionControl() {
    assert(this._actionControl !== null,
      'Action Control has not been set and is being accessed!');

    return this._actionControl;
  }

  public setEventEmitter(emitter: IEventEmitter) {
    assert(this._eventEmitter === null,
      'Event Emitter has already been set, attempting to override!');

    this._eventEmitter = emitter;
  }

  public setStore(store: IStore) {
    assert(this._store === null,
      'Store has already been set, attempting to override!');

    this._store = store;
  }

  public setDispatcher(dispatcher: IDispatcher) {
    assert(this._dispatcher === null,
      'Dispatcher has already been set, attempting to override!');

    this._dispatcher = dispatcher;
  }

  public setActionControl(actionControl: ActionControl) {
    assert(this._actionControl === null,
      'Action Control has already been set, attempting to override!');

    this._actionControl = actionControl;
  }

}

const DIControl = new DIControlClass();

export {DIControl};

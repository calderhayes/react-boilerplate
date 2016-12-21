
import {IEventEmitter} from './event-emitter';
import {IStore} from './store';
import {IDispatcher} from './dispatcher';
import {ActionControl} from './actions';

export class FluxControl {

  private _eventEmitter: IEventEmitter = null;
  private _store: IStore = null;
  private _dispatcher: IDispatcher = null;
  private _actionControl: ActionControl = null;

  public get eventEmitter() {
    if (this._eventEmitter === null) {
      // WARN, ASSERT, WHATEVER
    }

    return this._eventEmitter;
  }

  public get store() {
    if (this._store === null) {
      // WARN, ASSERT, WHATEVER
    }

    return this._store;
  }

  public get dispatcher() {
    if (this._dispatcher === null) {
      // warn, assert, whatever
    }

    return this._dispatcher;
  }

  public get actionControl() {
    if (this._actionControl === null) {
      // warn, assert, whatever
    }

    return this._actionControl;
  }

  public setEventEmitter(emitter: IEventEmitter) {
    if (this._eventEmitter !== null) {
      // WARN, ASSERT, WHATEVER
    }

    this._eventEmitter = emitter;
  }

  public setStore(store: IStore) {
    if (this._store !== null) {
      // WARN, ASSERT, WHATEVER
    }

    this._store = store;
  }

  public setDispatcher(dispatcher: IDispatcher) {
    if (this._dispatcher !== null) {
      // WARN, ASSERT, WHATEVER
    }

    this._dispatcher = dispatcher;
  }

  public setActionControl(actionControl: ActionControl) {
    if (this._actionControl !== null) {
      // WARN, ASSERT, WHATEVER
    }

    this._actionControl = actionControl;
  }

}

const StateControl = new FluxControl();

export {StateControl};

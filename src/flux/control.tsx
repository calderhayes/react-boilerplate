
import {IEventEmitter} from './event-emitter';
import {IStore} from './store';
import {IDispatcher} from './dispatcher';

export class FluxControl {

  private _eventEmitter: IEventEmitter = null;
  private _store: IStore = null;
  private _dispatcher: IDispatcher = null;

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

}

const StateControl = new FluxControl();

export {StateControl};
